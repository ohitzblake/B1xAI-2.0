const express = require('express');
const router = express.Router();
const { Configuration, OpenAIApi } = require('openai');

const openai = new OpenAIApi(new Configuration({ apiKey: process.env.OPENAI_API_KEY }));

const SYSTEM_PROMPT = `You are an expert code generator. Given a prompt and output type, return ONLY valid, ready-to-use code with minimal comments. For mods, generate a minimal working mod for the specified platform.`;

router.post('/', async (req, res) => {
  const { prompt, outputType } = req.body;
  if (!prompt || !outputType) return res.status(400).json({ error: 'Missing prompt or outputType' });

  let codePrompt = '';
  if (outputType === 'website') {
    codePrompt = `Generate an HTML/CSS/JS project as a single file or folder given this description: ${prompt}`;
  } else if (outputType === 'minecraft-mod') {
    codePrompt = `Generate a minimal Minecraft Forge mod in Java for this description: ${prompt}`;
  } else if (outputType === 'unity-mod') {
    codePrompt = `Generate a minimal Unity mod in C# for this description: ${prompt}`;
  } else {
    codePrompt = `Generate code for this description: ${prompt}`;
  }

  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: codePrompt }
      ],
      temperature: 0.2,
      max_tokens: 2048
    });
    const code = completion.data.choices[0].message.content;
    res.json({ code });
  } catch (err) {
    res.status(500).json({ error: 'AI code generation failed.' });
  }
});

module.exports = router;