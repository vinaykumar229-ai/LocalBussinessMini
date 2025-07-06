const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Predefined SEO headline templates
const headlines = [
  "Why {name} is {location}'s Sweetest Spot in 2025",
  "Discover {name}: A Hidden Gem in {location}",
  "{name} is Changing the Game for Local Businesses in {location}",
  "Locals Love {name}: See Why It's #1 in {location}",
];

// Helper function to generate headline
function generateHeadline(name, location) {
  const template = headlines[Math.floor(Math.random() * headlines.length)];
  return template.replace(/{name}/g, name).replace(/{location}/g, location);
}

// POST /business-data
app.post('/business-data', (req, res) => {
  const { name, location } = req.body;
  const data = {
    rating: parseFloat((Math.random() * 1.5 + 3.5).toFixed(1)),
    reviews: Math.floor(Math.random() * 500 + 50),
    headline: generateHeadline(name, location)
  };
  res.json(data);
});

// GET /regenerate-headline
app.get('/regenerate-headline', (req, res) => {
  const { name, location } = req.query;
  res.json({ headline: generateHeadline(name, location) });
});

// Start server
app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
