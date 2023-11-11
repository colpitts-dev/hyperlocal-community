import type { PersonDocument, PersonInput } from '../person.model'
import { Person } from '../person.model'
import { mockPerson } from '../__mocks__/person.mock'

describe('Person Model', () => {
  let person: PersonDocument, personInput: PersonInput

  beforeAll(async () => {
    personInput = mockPerson()
    person = new Person({ ...personInput })

    await person.save()
  })

  afterAll(async () => {
    await Person.deleteOne({ _id: person })
  })

  describe('when given valid input', () => {
    it('creates a new person', async () => {
      const fetchedPerson = await Person.findOne({ _id: person })

      expect(fetchedPerson).toBeDefined()
      expect(fetchedPerson?.name).toEqual(personInput.name)
    })

    it('updates a person', async () => {
      const personUpdateInput: PersonInput = mockPerson()
      await Person.updateOne(
        { _id: person },
        { ...personUpdateInput, name: 'John Doe' },
      )
      const fetchedPerson = await Person.findOne({ _id: person })
      expect(fetchedPerson).toBeDefined()
      expect(fetchedPerson?.name).toBe('John Doe')
    })

    it('deletes a person', async () => {
      await Person.deleteOne({ _id: person })
      const fetchedPerson = await Person.findOne({ _id: person })
      expect(fetchedPerson).toBeNull()
    })
  })

  describe('when creating new people', () => {
    const invalidPerson = new Person({
      name: undefined,
      email: 'invalidatexampledotcom',
      age: 16,
    })
    const validationResult = invalidPerson.validateSync()

    it('requires a nickname', () => {
      const validationError = validationResult?.errors.name.message
      expect(validationError).toBe('Nickname is required.')
    })

    it('requires a name', () => {
      const validationError = validationResult?.errors.name.message
      expect(validationError).toBe('Name is required.')
    })

    it('requires a valid email address', () => {
      const validationError = validationResult?.errors.email.message
      expect(validationError).toBe('Please enter a valid email.')
    })

    it('requires age to be at least 18 years old', () => {
      const validationError = validationResult?.errors.age.message
      expect(validationError).toBe('Must be at least 18 years old.')
    })
  })
})
