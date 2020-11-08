import { MongoHelper } from '../helpers'
import { AddContactParams } from '../../../../domain/usecases/contact/add-contact'
import { AddContactRepository } from '../../../../data/protocols/db/contact/add-contact-repository'
import { LoadContactsRepository } from '../../../../data/protocols/db/contact/load-contacts-repository'
import { ContactModel } from '../../../../domain/models/contact'

export class ContactMongoRepository implements AddContactRepository, LoadContactsRepository {
  async add (data: AddContactParams): Promise<ContactModel> {
    const collection = await MongoHelper.getCollection('contacts')
    const result = await collection.insertOne(data)
    return MongoHelper.map(result.ops[0])
  }

  async load (user: string): Promise<ContactModel[]> {
    const collection = await MongoHelper.getCollection('contacts')
    const contacts = await collection.find({ 'user.id': user }).toArray()
    return MongoHelper.mapCollection(contacts)
  }
}
