// mock items data
const items = [
  { id: 5, name: 'porkkana' },
  { id: 6, name: 'omena' },
  { id: 19, name: 'appelsiini' },
];

const getItems = (res) => {
  res.JSON(`{"message": "All items", "items": ${items}}`);
};

const getItemsById = (res, id) => {
  // if item with id exists send it, otherwise send 404
  console.log('getItemsById', req.params);
  const item = items.find((element) => element.id == req.params.id);
  if (item) {
    res.json(item);
  } else {
    res.status(404);
    res.json({ message: 'Item not found.' });
  }
};

const postItem = (req, res) => {
  console.log('New item posted', req.body);
  items.push(req.body);
  res.sendStatus(201);
};

// TODO: add deleteItem(), putItem() and routing for those in index.js

export { getItems, getItemsById, postItem };
