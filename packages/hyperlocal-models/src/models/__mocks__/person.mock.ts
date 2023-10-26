import { faker } from '@faker-js/faker'

export const mockPerson = () => {
  const name = faker.person.fullName()

  return {
    name,
    email: faker.internet.email({ firstName: name }),
    age: faker.number.int({ min: 18, max: 50 }), // Must be 18+
    location: faker.location.city(),
  }
}
