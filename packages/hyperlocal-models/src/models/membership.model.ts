import { Schema, model, Document } from 'mongoose'
import { PersonDocument } from './person.model'
import { CommunityDocument } from './community.model'

export interface MembershipInput {
  title: string
  isAdmin: boolean
}

export interface MembershipDocument extends Document, MembershipInput {
  owner: PersonDocument['_id']
  community: CommunityDocument['_id']
  createdAt: Date
  updatedAt: Date
}

const MembershipSchema = new Schema<MembershipDocument>(
  {
    title: { type: String, required: [true, 'Title is required.'] },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'Person',
    },
    community: {
      type: Schema.Types.ObjectId,
      ref: 'Community',
    },
    isAdmin: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
)

/**
 * Membership Model
 * @constructor Membership
 * ----
 * Memberships are the foundation of hyper[local]
 *
 */
export const Membership = model<MembershipDocument>(
  'Membership',
  MembershipSchema,
)
