import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

import {item, list} from './controllers/audio';
import {get, play, save} from './controllers/play';
import {init} from './core/file';

dotenv.config();

(async function main() {
  try {
    await init();
  } catch (err) {
    console.log(err);
  }
})();

const app = express();

app.on('error', console.log);

app.use(cors());

app.listen(6969, () => {
  console.log('[NodeJS] Application Listening on Port 6969');
});

app.get('/api/audio/play/:id', play);

app.get('/api/audio/save/:id/:time', save);
app.get('/api/audio/play/:id/time', get);

app.get('/api/audio', list);
app.get('/api/audio/:id', item);