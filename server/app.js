import express from 'express';
import cors from 'cors';

import { usersRoutes, contactsRoutes } from './routes/routes.js';
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', usersRoutes);
app.use('/api/contacts', contactsRoutes);

export default app;
