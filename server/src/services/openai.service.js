import OpenAI from 'openai';

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export const createEmbedding = async (text) => {
  const response = await openai.embeddings.create({
    model: process.env.OPENAI_EMBEDDING_MODEL || 'text-embedding-3-small',
    input: text,
    dimensions: Number(process.env.OPENAI_EMBEDDING_DIMENSIONS || 1536)
  });
  return response.data[0].embedding;
};

export const generateGroundedReply = async ({ userQuestion, contextBlocks }) => {
  const contextText = contextBlocks.length
    ? contextBlocks.map((block, idx) => `Context ${idx + 1}: ${block}`).join('\n\n')
    : 'No relevant context was found. Say that clearly and avoid making up facts.';

  const prompt = `
You are a helpful bookstore assistant.
Answer naturally, clearly, and in a human tone.
Use only the provided context for factual claims about books or book content.
If the answer is not in the context, say so plainly.

User question:
${userQuestion}

Retrieved context:
${contextText}
  `;

  const response = await openai.responses.create({
    model: process.env.OPENAI_CHAT_MODEL || 'gpt-4.1-mini',
    input: prompt
  });

  return response.output_text;
};
