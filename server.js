const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const redis = require("redis");
const UglifyJS = require("uglify-js");

dotenv.config();

const app = express();
const port = 3000;

const redisClient = redis.createClient({
  url: process.env.REDIS_URL
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

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post("/convert", rateLimiter, async (req, res) => {
  try {
    const { code, targetLang } = req.body;
    if (!code || !targetLang) {
      return res
        .status(400)
        .json({ error: "Code and target language are required." });
    }
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
    res.json(jsonResponse);
  } catch (error) {
    console.error("Error during conversion:", error);
    res.status(500).json({ error: "Failed to convert code." });
  }
});

app.post("/minify", (req, res) => {
  const { code } = req.body;
  if (!code) {
    return res.status(400).json({ error: "Code is required." });
  }
  const result = UglifyJS.minify(code);
  if (result.error) {
    return res.status(400).json({ error: result.error.message });
  }
  res.json({ minifiedCode: result.code });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});