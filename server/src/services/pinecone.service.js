import { Pinecone } from '@pinecone-database/pinecone';

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY
});

export const getIndex = () => {
  const indexName = process.env.PINECONE_INDEX_NAME;
  const host = process.env.PINECONE_INDEX_HOST;
  if (!indexName || !host) {
    throw new Error('Pinecone index configuration is missing');
  }
  return pinecone.index(indexName, host);
};
