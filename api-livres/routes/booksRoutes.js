import { createBook, getBooks, getBookById, updateBook, deleteBook } from '../controllers/bookController.js';
import { bookSchema } from '../schemas/bookSchema.js';

const bookRoutes = async (fastify, opts) => {
  fastify.post('/books', { schema: bookSchema }, createBook);
  fastify.get('/books', getBooks);
  fastify.get('/books/:id', getBookById);
  fastify.put('/books/:id', updateBook);
  fastify.delete('/books/:id', deleteBook);
};

export default bookRoutes;
