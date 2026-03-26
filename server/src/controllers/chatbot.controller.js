import { asyncHandler } from '../utils/asyncHandler.js';
import { retrieveBookContext } from '../services/rag.service.js';
import { generateGroundedReply } from '../services/openai.service.js';

export const askBookAssistant = asyncHandler(async (req, res) => {
  const { question, bookId } = req.body;
  if (!question) {
    return res.status(400).json({ message: 'Question is required' });
  }

  const snippets = await retrieveBookContext(question, bookId);
  const answer = await generateGroundedReply({
    userQuestion: question,
    contextBlocks: snippets.map((item) => item.text)
  });

  res.json({
    answer,
    snippets
  });
});
