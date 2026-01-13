import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { router as restRoutes } from '../rest/routes';
import { WebSocketServer } from '../websocket/server';
import { AuthMiddleware } from '../auth/middleware';

const app = express();
const port = process.env.API_PORT || 3000;

// middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// auth
const auth = new AuthMiddleware();
app.use('/api/v1', auth.verify);

// routes
app.use('/api/v1', restRoutes);

// websocket server
const wsServer = new WebSocketServer();

app.listen(port, () => {
  console.log(`api server running on port ${port}`);
});

export { app };
