import dotenv from 'dotenv';
import Fastify from 'fastify';
import fs from 'fs';
import connectDB from './databases/connexion.js';
import bookRoutes from './routes/booksRoutes.js';

import fastifyCors from '@fastify/cors';

dotenv.config();

// Lire les certificats SSL
const fastify = Fastify({
  https: {
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem'),
  },
  logger: true
});

// Activer CORS
fastify.register(fastifyCors, {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE']
});

// Connexion à la base de données
connectDB().catch(err => {
  console.error('Erreur de connexion à MongoDB:', err);
  process.exit(1);
});

// Enregistrement des routes
fastify.register(bookRoutes);

const start = async () => {
  try {
    await fastify.listen({ port: process.env.PORT || 3000, host: '0.0.0.0' });
    console.log(`Serveur en écoute sur https://localhost:${process.env.PORT || 3000}`);
  } catch (err) {
    console.error('Erreur au démarrage du serveur:', err);
    process.exit(1);
  }
};

start();
