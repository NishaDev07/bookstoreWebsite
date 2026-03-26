import { Router } from 'express';
import { askBookAssistant } from '../controllers/chatbot.controller.js';

const router = Router();

router.post('/ask', askBookAssistant);

export default router;
