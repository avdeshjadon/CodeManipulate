// Import required packages
const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();
const port = 3000;

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // To parse JSON request bodies

// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Define the /convert API endpoint
app.post('/convert', async (req, res) => {
  try {
    const { code, targetLang } = req.body;

    if (!code || !targetLang) {
      return res.status(400).json({ error: 'Code and target language are required.' });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `
      You are an expert code converter.
      Your task is to analyze the provided code snippet, identify its programming language, and then convert it to the specified target language.

      Follow these instructions precisely:
      1.  **Analyze the code**: Determine the source language of the code below.
      2.  **Convert the code**: Translate the code to ${targetLang}. Ensure the logic remains identical.
      3.  **Format the output**: Respond ONLY with a valid JSON object. Do not include any text, explanation, or markdown formatting before or after the JSON object.
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

    // Clean the response to ensure it's valid JSON
    const cleanedText = text.replace('```json', '').replace('```', '').trim();

    // Parse the JSON string into an object
    const jsonResponse = JSON.parse(cleanedText);

    res.json(jsonResponse);

  } catch (error) {
    console.error('Error during conversion:', error);
    res.status(500).json({ error: 'Failed to convert code.' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});