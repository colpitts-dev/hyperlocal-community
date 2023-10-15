import { model, Schema, Document } from 'mongoose'
import { MembershipDocument } from './membership.model'

export interface CommunityInput {
  title: string
  description?: string
  isPublic?: boolean
}

export interface CommunityDocument extends CommunityInput, Document {
  memberships: MembershipDocument[]
  updatedAt: Date
  createdAt: Date
}

const CommunitySchema = new Schema<CommunityDocument>(
  {
    title: {
      type: String,
      trim: true,
      validate: {
        validator: function (v: string) {
          return /^(?!\s*$).+/.test(v)
        },
        message: 'Please add a valid title.',
      },
      required: [true, 'Title is required.'],
    },
    description: {
      type: String,
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
    memberships: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Membership',
      },
    ],
  },
  {
    timestamps: true, // to create updatedAt and createdAt
  },
)

/**
 * Community Model
 * @constructor Community
 * ----
 * Communities are the foundation of hyper[local]
 *
 */

export const Community = model<CommunityDocument>('Community', CommunitySchema)
export default Community
