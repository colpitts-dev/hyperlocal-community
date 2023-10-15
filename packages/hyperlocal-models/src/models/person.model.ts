import { Schema, model, Document } from 'mongoose'

export interface PersonInput {
  name: string
  email: string
  age: number
}

export interface PersonDocument extends Document, PersonInput {
  createdAt: Date
  updatedAt: Date
}

const PersonSchema = new Schema<PersonDocument>(
  {
    name: { type: String, required: [true, 'Name is required.'] },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      validate: {
        validator: function (v: string) {
          return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v)
        },
        message: 'Please enter a valid email.',
      },
      required: [true, 'Email is required.'],
    },
    age: {
      type: Number,
      required: [true, 'Age is required.'],
      min: [18, 'Must be at least 18 years old.'],
    },
  },
  {
    timestamps: true,
  },
)

export const Person = model<PersonDocument>('Person', PersonSchema)
