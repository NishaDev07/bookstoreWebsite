import pdfParse from 'pdf-parse';
import { createEmbedding } from './openai.service.js';
import { getIndex } from './pinecone.service.js';

const chunkText = (text, size = 900, overlap = 120) => {
  const clean = text.replace(/\s+/g, ' ').trim();
  const chunks = [];
  let i = 0;

  while (i < clean.length) {
    const end = Math.min(i + size, clean.length);
    chunks.push(clean.slice(i, end));
    i += size - overlap;
  }
  return chunks.filter(Boolean);
};

export const extractTextFromPdfBuffer = async (buffer) => {
  const data = await pdfParse(buffer);
  return data.text || '';
};

export const indexBookContent = async ({ bookId, title, description, sampleText, textContent }) => {
  const source = [description, sampleText, textContent].filter(Boolean).join('\n\n');
  if (!source.trim()) return;

  const chunks = chunkText(source);
  const index = getIndex();

  const vectors = [];
  for (let i = 0; i < chunks.length; i += 1) {
    const embedding = await createEmbedding(chunks[i]);
    vectors.push({
      id: `${bookId}-${i}`,
      values: embedding,
      metadata: {
        bookId: String(bookId),
        title,
        chunkIndex: i,
        text: chunks[i]
      }
    });
  }

  if (vectors.length) {
    await index.namespace('books').upsert(vectors);
  }
};

export const semanticSearchBooks = async (query, topK = 8) => {
  const embedding = await createEmbedding(query);
  const index = getIndex();
  const response = await index.namespace('books').query({
    vector: embedding,
    topK,
    includeMetadata: true
  });

  return response.matches || [];
};

export const retrieveBookContext = async (question, bookId = null, topK = 5) => {
  const matches = await semanticSearchBooks(question, topK);
  return matches
    .filter((m) => !bookId || String(m.metadata?.bookId) === String(bookId))
    .map((m) => ({
      score: m.score,
      text: m.metadata?.text || '',
      title: m.metadata?.title || ''
    }));
};
