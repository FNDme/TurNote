import {Document, model, Schema} from 'mongoose';

type permission = 'read' | 'read-write' | 'admin';

interface NoteInterface extends Document {
  title: string;
  description: string;
  content: string;
  author: Schema.Types.ObjectId;
  collaborators: Schema.Types.ObjectId[];
  rating: number[];
  tags: string[];
  isPublic: boolean;
  sharedWith: [{ user: Schema.Types.ObjectId; permission: permission }];
  created: Date;
}

const NoteSchema = new Schema<NoteInterface>({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  content: {
    type: String,
    required: true,
    trim: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  collaborators: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  rating: [
    {
      type: Number,
      min: 1,
      max: 5,
    },
  ],
  tags: [
    {
      type: String,
      trim: true,
      match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
    },
  ],
  isPublic: {
    type: Boolean,
    default: false,
  },
  sharedWith: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
      permission: {
        type: String,
        enum: ['read', 'read-write', 'admin'],
      },
    },
  ],
  created: {
    type: Date,
    default: Date.now,
  },
});

export const Note = model<NoteInterface>('Note', NoteSchema);