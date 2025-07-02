const express = require('express');
const { v4: uuidv4 } = require('uuid');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

let issues = []; // Replace with DB in production

app.post('/api/issues', (req, res) => {
  const { description } = req.body;
  if (!description) return res.status(400).json({ error: 'Description required' });
  const issue = { id: uuidv4(), description, createdAt: new Date() };
  issues.push(issue);
  res.json({ issueId: issue.id });
});

// Support team endpoint (hidden to users)
app.get('/api/issues', (req, res) => {
  // TODO: Add authentication in real app
  res.json(issues);
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));