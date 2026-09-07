import 'dotenv/config';

import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import dns from 'dns';

import routes from './routes/index.js';

dns.setServers(['1.1.1.1']);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = 3001;

const app = express();

app.use(cookieParser());
app.use(express.json());


app.use('/uploads', express.static(path.resolve(__dirname, 'uploads')));


app.use(express.static(path.resolve(__dirname, '../frontend/dist')));


app.use('/api', routes);


app.get('*any', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend/dist/index.html'));
});


mongoose.connect(process.env.DB_CONNECTION_STRING).then(() => {
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
});

