import { ContactMongoRepository } from './contact-mongo-repository'
import { MongoHelper } from '../helpers/mongo-helper'
import { mockAddContactParams, mockAddAccountParams } from '../../../../domain/test'
import { Collection } from 'mongodb'
import { AccountModel } from '../../../../domain/models/account'

let collection: Collection
let accountCollection: Collection

const mockAccount = async (): Promise<AccountModel> => {
  const res = await accountCollection.insertOne(mockAddAccountParams())
  return MongoHelper.map(res.ops[0])
}

const makeSut = (): ContactMongoRepository => {
  return new ContactMongoRepository()
}

describe('ContactMongoRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    collection = await MongoHelper.getCollection('contacts')
    await collection.deleteMany({})
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('add()', () => {
    test('Should add a contact on success', async () => {
      const sut = makeSut()
      await sut.add(mockAddContactParams())
      const count = await collection.countDocuments()
      expect(count).toBe(1)
    })
  })

  describe('load()', () => {
    test('Should load all contacts on success', async () => {
      const addContactModels = [mockAddContactParams(), mockAddContactParams()]
      await collection.insertMany(addContactModels)
      const sut = makeSut()
      const contacts = await sut.load(addContactModels[0].user.id)
      expect(contacts.length).toBe(1)
      expect(contacts[0].id).toBeTruthy()
      expect(contacts[0].name).toBe(addContactModels[0].name)
      expect(contacts[0].phone).toBe(addContactModels[0].phone)
    })

    test('Should load empty list', async () => {
      const account = await mockAccount()
      const sut = makeSut()
      const contacts = await sut.load(account.id)
      expect(contacts.length).toBe(0)
    })
  })
})
