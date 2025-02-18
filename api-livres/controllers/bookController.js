import Book from '../models/books.js';

// Créer un livre
export const createBook = async (request, reply) => {
  try {
    const book = new Book(request.body);
    await book.save();
    reply.code(201).send({ titre: book.titre, auteur: book.auteur, description: book.description, format: book.format });
  } catch (error) {
    reply.code(500).send({ message: error.message });
  }
};

// Récupérer tous les livres
export const getBooks = async (request, reply) => {
  try {
    const books = await Book.find({}, 'titre auteur description format');
    reply.send(books);
  } catch (error) {
    reply.code(500).send({ message: error.message });
  }
};

// Récupérer un livre par ID
export const getBookById = async (request, reply) => {
  try {
    const book = await Book.findById(request.params.id, 'titre auteur description format');
    if (!book) return reply.code(404).send({ message: 'Livre non trouvé' });
    reply.send(book);
  } catch (error) {
    reply.code(500).send({ message: error.message });
  }
};

// Mettre à jour un livre
export const updateBook = async (request, reply) => {
  try {
    const book = await Book.findByIdAndUpdate(request.params.id, request.body, { new: true, select: 'titre auteur description format' });
    if (!book) return reply.code(404).send({ message: 'Livre non trouvé' });
    reply.send(book);
  } catch (error) {
    reply.code(500).send({ message: error.message });
  }
};

// Supprimer un livre
export const deleteBook = async (request, reply) => {
  try {
    const book = await Book.findByIdAndDelete(request.params.id);
    if (!book) return reply.code(404).send({ message: 'Livre non trouvé' });
    reply.send({ message: 'Livre supprimé avec succès' });
  } catch (error) {
    reply.code(500).send({ message: error.message });
  }
};
