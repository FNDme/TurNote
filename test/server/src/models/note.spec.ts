import { expect } from 'chai';
import { Note, NoteInterface } from '../../../../server/src/models/note';

describe('Note model', () => {
  it('should have a title field', () => {
    expect(Note.schema.paths).to.have.property('title');
  });
  it('should have a content field', () => {
    expect(Note.schema.paths).to.have.property('content');
  });
  it('should have an author field', () => {
    expect(Note.schema.paths).to.have.property('author');
  });
  it('should have a default value for isPublic field', () => {
    expect(Note.schema.paths.isPublic.options).to.have.property('default', false);
  });
  it('should have a default value for created field', () => {
    expect(Note.schema.paths.created.options).to.have.property('default');
  });
});