const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const { GoogleGenerativeAI } = require('@google/generative-ai');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/convert', async (req, res) => {
  const { code, targetLang } = req.body;
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const prompt = `
Auto-detect the source programming language of the code below and convert it to ${targetLang}. 
Only return the translated code. No explanation needed.

\`\`\`
${code}
\`\`\`
  `;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();
    res.json({ convertedCode: text, detectedLang: "Auto-detected" });
  } catch (err) {
    console.error("Convert error:", err.message);
    res.json({ convertedCode: "⚠️ Error during conversion." });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
