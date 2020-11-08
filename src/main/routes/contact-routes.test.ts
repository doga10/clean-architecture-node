import app from '../config/app'
import env from '../config/env'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import { sign } from 'jsonwebtoken'
import { Collection } from 'mongodb'
import request from 'supertest'

let contactCollection: Collection
let accountCollection: Collection

const mockAccessToken = async (): Promise<string> => {
  const res = await accountCollection.insertOne({
    name: 'Douglas Dennys',
    email: 'douglasdennys45@gmail.com',
    password: '123'
  })
  const id = res.ops[0]._id
  const accessToken = sign({ id }, env.jwtSecret)
  await accountCollection.updateOne({
    _id: id
  }, {
    $set: {
      accessToken
    }
  })
  return accessToken
}

describe('Contact Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    contactCollection = await MongoHelper.getCollection('contacts')
    await contactCollection.deleteMany({})
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('POST /contacts', () => {
    test('Should return 403 on add contact without accessToken', async () => {
      await request(app)
        .post('/v1/contacts')
        .send({
          name: 'Maria',
          phone: '+55 (84) 99191-9191'
        })
        .expect(403)
    })

    test('Should return 204 on add contact with valid accessToken', async () => {
      const accessToken = await mockAccessToken()
      await request(app)
        .post('/v1/contacts')
        .set('x-access-token', accessToken)
        .send({
          name: 'Maria',
          phone: '+55 (84) 99191-9191'
        })
        .expect(204)
    })
  })

  describe('GET /contacts', () => {
    test('Should return 403 on load contacts without accessToken', async () => {
      await request(app)
        .get('/v1/contacts')
        .expect(403)
    })

    test('Should return 204 on load contacts with valid accessToken', async () => {
      const accessToken = await mockAccessToken()
      await request(app)
        .get('/v1/contacts')
        .set('x-access-token', accessToken)
        .expect(204)
    })
  })
})
