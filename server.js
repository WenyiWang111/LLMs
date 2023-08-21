const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());
app.use(express.static('public')); // Serve static files from the 'public' directory

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

app.post('/recommendations', async (req, res) => {
    const mood = req.body.mood;
    // Here, you'd connect to the OpenAI API or any other AI service to get song recommendations.
    // For demonstration purposes, we'll return dummy data.
    const dummySongs = ["Song 1", "Song 2", ...];
    res.json(dummySongs);
});

const OPENAI_API_URL = 'https://api.openai.com/v1/...'; // The actual endpoint
const OPENAI_API_KEY = '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'; // Replace with your actual API key

app.post('/recommendations', async (req, res) => {
    const mood = req.body.mood;
    try {
        const response = await axios.post(OPENAI_API_URL, {
            prompt: `Recommend 10 songs for someone feeling ${mood}`,
            max_tokens: 100
        }, {
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            }
        });
        const recommendations = response.data.choices[0].text.split('\n');
        res.json(recommendations);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get recommendations' });
    }
});