import { faker } from '@faker-js/faker'

import { Community, CommunityDocument, CommunityInput } from './community.model'

const mockCommunity = () => ({
  title: faker.lorem.words(6)
})

describe('Community Model', () => {
  let community: CommunityDocument, communityInput: CommunityInput

  beforeAll(async () => {
    communityInput = mockCommunity()
    community = new Community({ ...communityInput })

    await community.save()
  })

  afterAll(async () => {
    await community.deleteOne()
  })

  describe('when given valid input', () => {
    it('creates and reads a new document', async () => {
      const fetchedCommunity = await Community.findOne({ _id: community._id })

      expect(fetchedCommunity).toBeDefined()
      expect(fetchedCommunity?.title).toEqual(communityInput.title)
    })

    it('updates an existing document', async () => {
      const communityUpdateInput: CommunityInput = mockCommunity()
      await Community.updateOne({ _id: community._id }, { ...communityUpdateInput })
      const fetchedCommunity = await Community.findOne({ _id: community._id })
      expect(fetchedCommunity).toBeDefined()
      expect(fetchedCommunity).toMatchObject(communityUpdateInput)
      expect(fetchedCommunity).not.toMatchObject(communityInput)
    })

    it('deletes an existing document', async () => {
      await Community.deleteOne({ _id: community._id })
      const fetchedCommunity = await Community.findOne({ _id: community._id })
      expect(fetchedCommunity).toBeNull()
    })
  })

  describe('when validating documents', () => {
    const invalidCommunity = new Community({
      title: undefined
    })
    const validationResult = invalidCommunity.validateSync()

    it('requires a valid title', () => {
      const validationError = validationResult?.errors?.title?.message
      expect(validationError).toBe('Title is required.')
    })
  })
})