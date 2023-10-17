import type { Document } from 'mongoose'
import { Schema, model } from 'mongoose'
import type { MembershipDocument } from './membership.model'

export interface PersonInput {
  name: string
  email: string
  age: number
  location?: string
}

export interface PersonDocument extends Document, PersonInput {
  memberships: MembershipDocument[]
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
        validator(v: string) {
          // eslint-disable-next-line prefer-named-capture-group -- ignore
          return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v)
        },
        message: 'Please enter a valid email.',
      },
      required: [true, 'Email is required.'],
    },
    location: {
      type: String,
    },
    age: {
      type: Number,
      required: [true, 'Age is required.'],
      min: [18, 'Must be at least 18 years old.'],
    },
    memberships: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Membership',
      },
    ],
  },
  {
    timestamps: true,
  },
)

/**
 * Person Model
 * @alpha
 * ----
 * A person belongs to many communities through their memberships.
 *
 */
export const Person = model<PersonDocument>('Person', PersonSchema)
