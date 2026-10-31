const express = require('express');
const app = express();
const port = 8080;

app.use(express.json());


app.get('/', (req, res) => {
  res.send('Hello, World!');
});
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
let students = [{ id: 1, name: 'Akshaya', course: 'CSE' },{ id: 2, name: 'John', course: 'ECE' }];
let nextId = 3;

app.get('/students', (req, res) => res.json(students));

app.get('/students/:id', (req, res) => {
  const s = students.find(s => s.id == req.params.id);
  if (!s) return res.status(404).json({ msg: 'Not found' });
  res.json(s);
});

app.post('/students', (req, res) => {
  const s = { id: nextId++, ...req.body };
  students.push(s);
  res.status(201).json(s);
});

app.patch('/students/:id', (req, res) => {
  const s = students.find(s => s.id == req.params.id);
  if (!s) return res.status(404).json({ msg: 'Not found' });
  Object.assign(s, req.body);
  res.json(s);
});

app.delete('/students/:id', (req, res) => {
  students = students.filter(s => s.id != req.params.id);
  res.json({ msg: 'Deleted' });
});
