import { LoadContactsRepository, LoadContacts, ContactModel } from './db-load-contacts-protocols'

export class DbLoadContacts implements LoadContacts {
  constructor (private readonly loadContactsRepository: LoadContactsRepository) {}

  async load (user: string): Promise<ContactModel[]> {
    return await this.loadContactsRepository.load(user)
  }
}
