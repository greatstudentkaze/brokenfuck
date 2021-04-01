import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config.js';

import cors from './middlewares/cors.js';
import authRouter from './routers/auth.js';
import missionRouter from './routers/mission.js';

const PORT = process.env.PORT;

const app = express();
app.use(cors);
app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/missions', missionRouter);

(async () => {
  try {
    if (!process.env.DATABASE_URL) {
      return console.error('Добавь ссылку для подключения к MongoDB Cluster: https://cloud.mongodb.com/v2/6064444ce399f0713425f88e#clusters/connect?clusterId=Cluster0');
    }

    await mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });

    app.listen(PORT, () => {
      console.log(`\nСервер запущен на порту ${PORT}`);
    });

  } catch (err) {
    console.error(err);
  }
})();
