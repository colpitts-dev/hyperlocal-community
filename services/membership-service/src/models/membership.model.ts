import { Schema, model, Document } from 'mongoose'

export interface MembershipInput {
  email: string
  age: number
}

export interface MembershipDocument extends Document, MembershipInput {
  createdAt: Date
  updatedAt: Date
}

const MembershipSchema = new Schema<MembershipDocument>(
  {
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

export const Membership = model<MembershipDocument>(
  'Membership',
  MembershipSchema,
)
