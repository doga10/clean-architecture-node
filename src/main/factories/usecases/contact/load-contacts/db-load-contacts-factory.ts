import { ContactMongoRepository } from '../../../../../infra/db/mongodb/contact/contact-mongo-repository'
import { LoadContacts } from '../../../../../domain/usecases/contact/load-contacts'
import { DbLoadContacts } from '../../../../../data/usecases/contact/load-contacts/db-load-contacts'

export const makeDbLoadContacts = (): LoadContacts => {
  const contactMongoRepository = new ContactMongoRepository()
  return new DbLoadContacts(contactMongoRepository)
}
