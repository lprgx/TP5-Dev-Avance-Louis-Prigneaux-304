import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  titre: { type: String, required: true },
  auteur: { type: String, required: true },
  description: String,
  format: { type: String, enum: ['poche', 'manga', 'audio'], default: 'poche' }
});

const Book = mongoose.model('Book', bookSchema);
export default Book;
