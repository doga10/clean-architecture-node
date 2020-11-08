import { ContactModel } from '../models/contact'
import { AddContactParams } from '../usecases/contact/add-contact'
import faker from 'faker'

export const mockContactModel = (): ContactModel => ({
  id: faker.random.uuid(),
  name: faker.random.words(),
  phone: faker.phone.phoneNumber(),
  user: {
    id: faker.random.uuid(),
    name: faker.random.words(),
    email: faker.internet.email()
  },
  createdAt: faker.date.recent(),
  updatedAt: faker.date.recent()
})

export const mockContactModels = (): ContactModel[] => [
  mockContactModel(),
  mockContactModel()
]

export const mockAddContactParams = (): AddContactParams => ({
  user: {
    id: faker.random.uuid(),
    name: faker.random.words(),
    email: faker.internet.email()
  },
  name: faker.random.words(),
  phone: faker.phone.phoneNumber()
})