import { faker } from '@faker-js/faker'

export const mockPerson = () => {
  const nickname = faker.internet.userName()
  const name = faker.person.fullName()

  return {
    nickname,
    name,
    email: faker.internet.email({ firstName: name }),
    age: faker.number.int({ min: 18, max: 50 }), // Must be 18+
    location: faker.location.city(),
  }
}
