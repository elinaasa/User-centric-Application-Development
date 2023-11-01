import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { getItems, getItemsById, postItem } from './items';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const hostname = '127.0.0.1';
const app = express();
const port = 3000;

app.use(express.json);
app.use('docs', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.send('Welcome to my REST API!');
});

// example
app.get('/kukkuu', (req, res) => {
  const myResponse = { message: 'moi' };
  res.status(400);
  res.json(myResponse);
});

// example items api
app.get('/api/items', getItems);
app.get('/api/items/:id', getItemsById);
app.put('/api/items');
app.post('/api/items', postItem);
app.delete('/api/items');

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
