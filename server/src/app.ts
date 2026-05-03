import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import { env } from './config/env';
import { errorHandler } from './middlewares/Error.middleware';
import { ApiError } from './utils/apiError';
import userRouter from './routes/user.routes';
import conversationRouter from './routes/conversation.routes';

const app = express();

app.use(
  cors({
    origin: env.CLIENT_URL,
    credentials: true,
  }),
);

app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(cookieParser());

const publicDir = path.join(process.cwd(), 'public');

app.use(express.static(publicDir));

app.get('/', (_, res) => {
  res.sendFile(path.join(publicDir, 'index.html'));
});

app.use('/api/users', userRouter);
app.use('/api/conversations', conversationRouter);

app.get('/health', (_, res) => {
  res.status(200).json({ status: 'active', service: 'Batiyoun Backend' });
});

app.use((req, res, next) => {
  next(new ApiError(404, `Route not found: ${req.originalUrl}`));
});

app.use(errorHandler);

export { app };
