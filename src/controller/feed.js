const express = require('express');
const router = express.Router();
const User = require('../model/userSchema');


const authMiddleware = async (req, res, next) => {
  try {
    const email = req.session.userEmail;
    if (!email) {
      return res.status(401).json({ error: 'Please login before accessing feed' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Authentication failed' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Auth error:', error);
    res.status(500).json({ error: 'Authentication error' });
  }
};

router.use('/feed', authMiddleware);

router.get('/feed', async (req, res) => {
  try {
    const apiKey = process.env.NEWS_API_KEY;
    const url = `https://newsapi.org/v2/everything?q=tesla&from=2025-01-10&sortBy=publishedAt&apiKey=${apiKey}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('News API error:', error);
    res.status(500).json({ error: 'Failed to fetch news feed' });
  }
});

module.exports = router;
