// Import the Express library
const express = require('express');

// Create an instance of an Express application
const app = express();

// Define the port number the server will listen on
const PORT = 3000; // You can choose any port you like

// Middleware to parse JSON bodies from incoming requests
app.use(express.json());

// Data store (in-memory array to hold items)
let items = [];

// POST route to add a new item
app.post('/items', (req, res) => {
  const newItem = req.body; // Get the new item data from the request body
  newItem.id = items.length + 1; // Assigning a unique ID (this is just for demo purposes)
  items.push(newItem); // Add the new item to the items array
  res.status(201).json(newItem); // Respond with the new item and status 201 (Created)
});

// GET route to list all items
app.get('/items', (req, res) => {
  res.json(items); // Respond with the array of all items
});

// GET route to retrieve a single item by ID
app.get('/items/:id', (req, res) => {
  const id = parseInt(req.params.id); // Parse the ID from the URL parameters
  const item = items.find(item => item.id === id); // Find the item with the matching ID
  if (!item) {
    res.status(404).send('Item not found'); // Respond with 404 if item not found
  } else {
    res.json(item); // Respond with the found item
  }
});

// PUT route to update an item by ID
app.put('/items/:id', (req, res) => {
  const id = parseInt(req.params.id); // Parse the ID from the URL parameters
  const update = req.body; // Get the updated data from the request body
  let item = items.find(item => item.id === id); // Find the item with the matching ID
  if (!item) {
    res.status(404).send('Item not found'); // Respond with 404 if item not found
  } else {
    item = Object.assign(item, update); // Update the item with new data
    res.json(item); // Respond with the updated item
  }
});

// DELETE route to delete an item by ID
app.delete('/items/:id', (req, res) => {
  const id = parseInt(req.params.id); // Parse the ID from the URL parameters
  items = items.filter(item => item.id !== id); // Remove the item with the matching ID
  res.sendStatus(204); // Respond with 204 (No Content) indicating successful deletion
});

// Error handling middleware for all other routes
app.use((req, res) => {
  res.status(404).send('404 - Not Found'); // Respond with 404 for any undefined routes
});

// Error handling middleware for internal server errors
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error stack trace
  res.status(500).send('500 - Server Error'); // Respond with 500 for any internal server errors
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`); // Log that the server has started
});
