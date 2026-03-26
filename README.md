# MBook
A polished full stack bookstore ecommerce portal with role based access, JWT auth, wishlist, cart, author publishing flow, manager approvals, Stripe checkout, AWS S3 file storage, semantic search with Pinecone, and a RAG grounded chatbot powered by OpenAI.

## Stack
Frontend: React + Vite + React Router + Context API
Backend: Node.js + Express + MongoDB + Mongoose
Auth: JWT
Payments: Stripe Checkout + webhook
Storage: AWS S3
RAG: OpenAI embeddings + OpenAI text generation + Pinecone vector search

## Roles
- customer: browse books, wishlist, cart, checkout, chatbot
- author: submit books
- manager: approve books, manage catalog, view orders

## Features
- JWT based login and role based route protection
- book browsing, category filters, semantic search
- cart and wishlist
- Stripe payment flow
- author upload with cover and book file to S3
- automatic PDF text extraction for RAG indexing when possible
- grounded chatbot that only answers from indexed content when context exists

## Project Structure
```text
bookstore-portal/
  client/
  server/
```

## Environment Setup

### Server `.env`
Copy `server/.env.example` to `server/.env` and replace placeholders.

### Client `.env`
Copy `client/.env.example` to `client/.env` and replace placeholders.

## Install

### Server
```bash
cd server
npm install
npm run dev
```

### Client
```bash
cd client
npm install
npm run dev
```

## MongoDB
Use a local MongoDB instance or MongoDB Atlas and set `MONGO_URI`.

## Stripe Webhook
For local testing:
```bash
stripe listen --forward-to localhost:5000/api/payments/webhook
```
Then put the webhook secret into `STRIPE_WEBHOOK_SECRET`.

## Pinecone Setup
1. Create a serverless index in Pinecone.
2. Set dimension to match your embedding model output. If you keep the default code and use `text-embedding-3-small`, keep dimensions aligned with your chosen value.
3. Put the index host and API key into the server env.

## AWS S3 Setup
1. Create a bucket
2. Set IAM credentials with PutObject/GetObject permissions
3. Put the bucket name and region into the server env

## Seed a Manager and Sample Books
```bash
cd server
npm run seed
```

## Notes
- The chatbot is grounded with retrieved chunks from Pinecone.
- If a PDF is uploaded, the backend attempts text extraction for vector indexing.
- If extraction is weak, the author can also provide `description` and `sampleText`.
- Managers approve books before customers can see them.
