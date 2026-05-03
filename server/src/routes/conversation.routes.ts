import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import {
  getMyConversations,
  getConversationMessages,
  getConversationById,
} from '../controllers/conversation.controller';

const conversationRouter = Router();

conversationRouter.use(authMiddleware);

conversationRouter.get('/my-conversations', getMyConversations);
conversationRouter.get('/:conversationId/messages', getConversationMessages);
conversationRouter.get('/:conversationId', getConversationById);

export default conversationRouter;
