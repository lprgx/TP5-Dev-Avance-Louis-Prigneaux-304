export const bookSchema = {
    body: {
      type: 'object',
      required: ['titre', 'auteur'],
      properties: {
        titre: { type: 'string' },
        auteur: { type: 'string' },
        description: { type: 'string' },
        format: { type: 'string', enum: ['poche', 'manga', 'audio'], default: 'poche' }
      }
    }
  };
  