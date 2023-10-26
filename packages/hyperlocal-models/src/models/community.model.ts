import type { Document } from 'mongoose'
import { model, Schema } from 'mongoose'
import type { MembershipDocument } from './membership.model'

export interface CommunityInput {
  title: string
  description?: string
  isPublic?: boolean
  theme?: object
}

export interface CommunityDocument extends CommunityInput, Document {
  memberships?: MembershipDocument[]
  updatedAt: Date
  createdAt: Date
}

const CommunitySchema = new Schema<CommunityDocument>(
  {
    title: {
      type: String,
      trim: true,
      validate: {
        validator(v: string) {
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
    theme: Object,
  },
  {
    timestamps: true, // to create updatedAt and createdAt
  },
)

/*

PRE SAVE IDEA

function string_to_slug(str) {
  str = str.replace(/^\s+|\s+$/g, ''); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
  var to   = "aaaaeeeeiiiioooouuuunc------";
  for (var i=0, l=from.length ; i<l ; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-'); // collapse dashes

  return str;
}

*/

/**
 * Community Model
 * @alpha
 * ----
 * A Community is a group of people who share a common interest.
 *
 */
export const Community = model<CommunityDocument>('Community', CommunitySchema)
