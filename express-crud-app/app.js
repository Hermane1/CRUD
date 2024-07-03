const express = require('express');
const app = express();
const PORT = 3000; 

app.use(express.json());


let items = [];


app.post('/items', (req, res) => {
  const newItem = req.body;
  newItem.id = items.length + 1; 
  items.push(newItem);
  res.status(201).json(newItem);
});


app.get('/items', (req, res) => {
  res.json(items);
});


app.get('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const item = items.find(item => item.id === id);
  if (!item) {
    res.status(404).send('Item not found');
  } else {
    res.json(item);
  }
});


app.put('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const update = req.body;
  let item = items.find(item => item.id === id);
  if (!item) {
    res.status(404).send('Item not found');
  } else {
    item = Object.assign(item, update); 
    res.json(item);
  }
});


app.delete('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  items = items.filter(item => item.id !== id);
  res.sendStatus(204); 
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
