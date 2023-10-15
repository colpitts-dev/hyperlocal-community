import { faker } from '@faker-js/faker'

import { Membership, MembershipDocument, MembershipInput } from './membership.model'

const mockMembership = () => ({
  title: faker.lorem.words(6)
})

describe('Membership Model', () => {
  let membership: MembershipDocument, membershipInput: MembershipInput

  beforeAll(async () => {
    membershipInput = mockMembership()
    membership = new Membership({ ...membershipInput })

    await membership.save()
  })

  afterAll(async () => {
    await membership.deleteOne()
  })

  describe('when given valid input', () => {
    it('creates and reads a new document', async () => {
      const fetchedMembership = await Membership.findOne({ _id: membership._id })

      expect(fetchedMembership).toBeDefined()
      expect(fetchedMembership?.title).toEqual(membershipInput.title)
    })

    it('updates an existing document', async () => {
      const membershipUpdateInput: MembershipInput = mockMembership()
      await Membership.updateOne({ _id: membership._id }, { ...membershipUpdateInput })
      const fetchedMembership = await Membership.findOne({ _id: membership._id })
      expect(fetchedMembership).toBeDefined()
      expect(fetchedMembership).toMatchObject(membershipUpdateInput)
      expect(fetchedMembership).not.toMatchObject(membershipInput)
    })

    it('deletes an existing document', async () => {
      await Membership.deleteOne({ _id: membership._id })
      const fetchedMembership = await Membership.findOne({ _id: membership._id })
      expect(fetchedMembership).toBeNull()
    })
  })

  describe('when validating documents', () => {
    const invalidMembership = new Membership({
      title: undefined
    })
    const validationResult = invalidMembership.validateSync()

    it('requires a valid title', () => {
      const validationError = validationResult?.errors?.title?.message
      expect(validationError).toBe('Title is required.')
    })
  })
})