const express = require('express');
const app = express();
const PORT = 3000; // You can choose any port you like

// Middleware to parse JSON bodies
app.use(express.json());

// Data store (in-memory array)
let items = [];

// POST route to add a new item
app.post('/items', (req, res) => {
  const newItem = req.body;
  newItem.id = items.length + 1; // Assigning a unique ID (this is just for demo purposes)
  items.push(newItem);
  res.status(201).json(newItem);
});

// GET route to list all items
app.get('/items', (req, res) => {
  res.json(items);
});

// GET route to retrieve a single item by ID
app.get('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const item = items.find(item => item.id === id);
  if (!item) {
    res.status(404).send('Item not found');
  } else {
    res.json(item);
  }
});

// PUT route to update an item by ID
app.put('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const update = req.body;
  let item = items.find(item => item.id === id);
  if (!item) {
    res.status(404).send('Item not found');
  } else {
    item = Object.assign(item, update); // Update item with new data
    res.json(item);
  }
});

// DELETE route to delete an item by ID
app.delete('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  items = items.filter(item => item.id !== id);
  res.sendStatus(204); // No content
});

// Error handling middleware for all other routes
app.use((req, res) => {
  res.status(404).send('404 - Not Found');
});

// Error handling middleware for internal server errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('500 - Server Error');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
