import { AddContact } from '../../../../../domain/usecases/contact/add-contact'
import { ContactMongoRepository } from '../../../../../infra/db/mongodb/contact/contact-mongo-repository'
import { DbAddContact } from '../../../../../data/usecases/contact/add-contact/db-add-contact'

export const makeDbAddContact = (): AddContact => {
  const contactMongoRepository = new ContactMongoRepository()
  return new DbAddContact(contactMongoRepository)
}
