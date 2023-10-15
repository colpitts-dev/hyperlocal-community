import { faker } from '@faker-js/faker'

import {
  Membership,
  MembershipDocument,
  MembershipInput,
} from './membership.model'

const getNewMembership = () => ({
  email: faker.internet.email().toLowerCase(),
  age: faker.number.int({ min: 18, max: 100 }),
})

describe('Membership Model', () => {
  let membership: MembershipDocument, membershipInput: MembershipInput

  beforeAll(async () => {
    membershipInput = getNewMembership()
    membership = new Membership({ ...membershipInput })

    await membership.save()
  })

  afterAll(async () => {
    await membership.deleteOne()
  })

  describe('when given valid input', () => {
    it('creates and reads a new membership', async () => {
      const fetchedMembership = await Membership.findOne({
        _id: membership._id,
      })

      expect(fetchedMembership).toBeDefined()
      expect(fetchedMembership?.email).toEqual(membershipInput.email)
    })

    it('updates an existing membership', async () => {
      const membershipUpdateInput: MembershipInput = getNewMembership()
      await Membership.updateOne(
        { _id: membership._id },
        { ...membershipUpdateInput },
      )
      const fetchedMembership = await Membership.findOne({
        _id: membership._id,
      })
      expect(fetchedMembership).toBeDefined()
      expect(fetchedMembership).toMatchObject(membershipUpdateInput)
      expect(fetchedMembership).not.toMatchObject(membershipInput)
    })

    it('deletes an existing membership', async () => {
      await Membership.deleteOne({ _id: membership._id })
      const fetchedMembership = await Membership.findOne({
        _id: membership._id,
      })
      expect(fetchedMembership).toBeNull()
    })
  })

  describe('when validating documents', () => {
    const invalidMembership = new Membership({
      email: 'invalidatexampledotcom',
      age: 16,
    })
    const validationResult = invalidMembership.validateSync()

    it('requires a valid email address', () => {
      const validationError = validationResult?.errors?.email?.message
      expect(validationError).toBe('Please enter a valid email.')
    })

    it('requires a Membership to be at least 18 years old', () => {
      const validationError = validationResult?.errors?.age?.message
      expect(validationError).toBe('Must be at least 18 years old.')
    })
  })
})
