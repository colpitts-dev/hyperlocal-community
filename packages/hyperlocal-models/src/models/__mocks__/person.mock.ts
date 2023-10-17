import { faker } from '@faker-js/faker'

export const mockPerson = () => ({
  name: faker.person.fullName(),
  email: faker.internet.email().toLowerCase(),
  age: faker.number.int({ min: 18, max: 100 }),
  location: faker.location.city(),
})
