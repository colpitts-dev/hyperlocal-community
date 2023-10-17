import { mockCommunity } from '../__mocks__/community.mock'
import { mockMembershipInput } from '../__mocks__/membership.mock'
import { mockPerson } from '../__mocks__/person.mock'
import type { CommunityDocument, CommunityInput } from '../community.model'
import { Community } from '../community.model'
import type { MembershipDocument, MembershipInput } from '../membership.model'
import { Membership } from '../membership.model'
import { Person, type PersonDocument, type PersonInput } from '../person.model'

describe('Membership Model', () => {
  let membership: MembershipDocument, membershipInput: MembershipInput
  let community: CommunityDocument, communityInput: CommunityInput
  let person: PersonDocument, personInput: PersonInput

  beforeAll(async () => {
    communityInput = mockCommunity()
    community = new Community({ ...communityInput })
    await community.save()

    personInput = mockPerson()
    person = new Person({ ...personInput })
    await person.save()

    membershipInput = mockMembershipInput()
    membership = new Membership({
      ...membershipInput,
      owner: person,
      community,
    })

    await membership.save()
  })

  afterAll(async () => {
    await Promise.all([
      community.deleteOne(),
      person.deleteOne(),
      membership.deleteOne(),
    ])
  })

  describe('when given valid input', () => {
    it('creates and reads a new document', async () => {
      const fetchedMembership = await Membership.findOne({
        id: membership,
      })

      expect(fetchedMembership).toBeDefined()
      // Sets admin access to false by default
      expect(fetchedMembership?.isAdmin).toEqual(false)
    })

    it('updates an existing document', async () => {
      const membershipUpdateInput: MembershipInput = mockMembershipInput()
      await Membership.updateOne(
        { id: membership },
        { ...membershipUpdateInput },
      )
      const fetchedMembership = await Membership.findOne({
        id: membership,
      })
      expect(fetchedMembership).toBeDefined()
      expect(fetchedMembership).toMatchObject(membershipUpdateInput)
      expect(fetchedMembership).not.toMatchObject(membershipInput)
    })

    it('deletes an existing document', async () => {
      await Membership.deleteOne({ id: membership })
      const fetchedMembership = await Membership.findOne({
        id: membership,
      })
      expect(fetchedMembership).toBeNull()
    })
  })
})
