import 'reflect-metadata'
import express from 'express';
import './database'
import { rounter } from './routes';

const app = express();

app.use(express.json());
app.use(rounter)

app.listen(3333, () => console.log("Server is running!"))