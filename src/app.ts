import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { userRoutes } from './modules/user/user.router';

const app: Application = express();

//parser
app.use(express.json());
app.use(cors());

//application router
app.use('/api/users', userRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('server is running');
});

export default app;
