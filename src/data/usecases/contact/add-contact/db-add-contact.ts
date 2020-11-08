import { AddContact, AddContactParams, ContactModel, AddContactRepository } from './db-add-contact-protocols'

export class DbAddContact implements AddContact {
  constructor (private readonly addContactRepository: AddContactRepository) {}

  async add (data: AddContactParams): Promise<ContactModel> {
    return await this.addContactRepository.add(data)
  }
}
