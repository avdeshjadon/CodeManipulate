const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const redis = require("redis");
const UglifyJS = require("uglify-js");
const { minify: minifyCss } = require("csso");
const { minify: minifyHtml } = require("html-minifier-terser");

dotenv.config();

const app = express();
const port = 3000;

// Collect all Gemini API keys from environment variables into an array
const geminiApiKeys = Object.keys(process.env)
  .filter((key) => key.startsWith("GEMINI_KEY_"))
  .map((key) => process.env[key]);

if (geminiApiKeys.length === 0) {
  console.error("No GEMINI_KEY found in .env file. Please add at least one GEMINI_KEY_1.");
  process.exit(1);
}

// --- MODIFICATION START ---
// Add a counter to keep track of the next key to use (Round-Robin)
let currentKeyIndex = 0;
// --- MODIFICATION END ---

console.log(`Found ${geminiApiKeys.length} Gemini API keys. Ready to serve requests.`);

const redisClient = redis.createClient({
  url: process.env.REDIS_URL,
});

redisClient.on("error", (err) => console.log("Redis Client Error", err));

(async () => {
  await redisClient.connect();
  console.log("Connected to Upstash Redis successfully!");
})();

const RATE_LIMIT_WINDOW_SECONDS = 60;
const MAX_REQUESTS_PER_WINDOW = 5;

app.set("trust proxy", 1);

const rateLimiter = async (req, res, next) => {
  const ip = req.ip;
  try {
    const requestCount = await redisClient.incr(ip);
    if (requestCount === 1) {
      await redisClient.expire(ip, RATE_LIMIT_WINDOW_SECONDS);
    }
    if (requestCount > MAX_REQUESTS_PER_WINDOW) {
      const ttl = await redisClient.ttl(ip);
      return res.status(429).json({
        error: "Too Many Requests",
        message: `You have exceeded the limit of ${MAX_REQUESTS_PER_WINDOW} requests per minute.`,
        retryAfter: ttl,
      });
    }
    next();
  } catch (error) {
    console.error("Redis error:", error);
    next();
  }
};

app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(express.json({ limit: "50mb" }));


app.post("/convert", rateLimiter, async (req, res) => {
  const { code, targetLang } = req.body;
  if (!code || !targetLang) {
    return res
      .status(400)
      .json({ error: "Code and target language are required." });
  }

  // --- MODIFICATION START ---
  // Loop through all keys, starting from the currentKeyIndex
  for (let i = 0; i < geminiApiKeys.length; i++) {
    // Calculate the index of the key to try in a round-robin fashion
    const keyToTryIndex = (currentKeyIndex + i) % geminiApiKeys.length;
    const apiKey = geminiApiKeys[keyToTryIndex];
    const keyIdentifier = `GEMINI_KEY_${keyToTryIndex + 1}`;

    console.log(`Attempting conversion with ${keyIdentifier}...`);

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        generationConfig: {
          responseMimeType: "application/json",
        },
      });
      const prompt = `
You are an expert code converter.
Your task is to analyze the provided code snippet, identify its programming language, and then convert it to the specified target language.
Follow these instructions precisely:
1. Analyze the code: Determine the source language of the code below.
2. Convert the code: Translate the code to ${targetLang}. Ensure the logic remains identical.
3. Format the output: Respond ONLY with a valid JSON object. Do not include any text, explanation, or markdown formatting before or after the JSON object.
The JSON object must have two keys:
- "detectedLang": A string with the name of the detected source language.
- "convertedCode": A string containing only the converted code.
Here is the code to process:
\`\`\`
${code}
\`\`\`
`;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      const jsonResponse = JSON.parse(text);

      console.log(`Success with ${keyIdentifier}!`);
      
      // Update the counter for the *next* request
      currentKeyIndex = (keyToTryIndex + 1) % geminiApiKeys.length;

      // Add the used key's name to the response for the client
      jsonResponse.usedKey = keyIdentifier;

      return res.json(jsonResponse);

    } catch (error) {
      console.error(`Error with ${keyIdentifier}:`, error.message);
      
      if (error.status === 429 || (error.message && error.message.includes('429'))) {
        console.log(`${keyIdentifier} is rate-limited. Trying next key...`);
        continue; // Try the next key
      } else {
        return res.status(500).json({ error: "An unexpected error occurred during conversion." });
      }
    }
  }
  // --- MODIFICATION END ---
  
  console.error("All Gemini API keys are rate-limited.");
  return res.status(429).json({
    error: "Quota Exceeded",
    message: "All available API keys are currently rate-limited. Please try again later.",
  });
});

// ... (your /minify route remains unchanged)
app.post("/minify", async (req, res) => {
    // ... no changes here
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});