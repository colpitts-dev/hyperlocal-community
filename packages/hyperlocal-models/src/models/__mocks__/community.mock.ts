/* eslint-disable @typescript-eslint/explicit-function-return-type  -- ignore */
import { faker } from '@faker-js/faker'

export const mockCommunity = () => ({
  title: faker.lorem.words(6),
})
