import express from 'express';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  return res.json({ message: 'Hello Guy' });
});

app.listen(3333, () => {
  console.log('🚀 Server started on port 3333!');
});