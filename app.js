import fs from 'fs';
import path from 'path';
import express from 'express';
import axios from 'axios';

const app = express();

const PORT = 3000;

const upload = async () => {
  const data = await axios.get('https://api.github.com/events');
  const sortedArr = data.data.sort((a, b) => a?.actor?.id - b?.actor?.id);
  const arrToStore = sortedArr.map((element) => element.payload);
  const rout = path.resolve('database');
  await fs.promises.writeFile(
    rout + '/payload.json',
    JSON.stringify(arrToStore)
  );
};

upload();

app.post('/upload-events', async (req, res) => {
  await upload();
  res.send('information is stored');
});

app.listen(PORT, () => {
  console.log('Server is running');
});
