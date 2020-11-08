import { AddContactRepository } from '../protocols/db/contact/add-contact-repository'
import { LoadContactsRepository } from '../protocols/db/contact/load-contacts-repository'
import { AddContactParams } from '../../domain/usecases/contact/add-contact'
import { ContactModel } from '../../domain/models/contact'
import { mockContactModels, mockContactModel } from '../../domain/test'

export class AddContactRepositorySpy implements AddContactRepository {
  addContactParams: AddContactParams
  contactModel = mockContactModel()

  async add (data: AddContactParams): Promise<ContactModel> {
    this.addContactParams = data
    return this.contactModel
  }
}

export class LoadContactsRepositorySpy implements LoadContactsRepository {
  contactModels = mockContactModels()
  user: string

  async load (user: string): Promise<ContactModel[]> {
    this.user = user
    return this.contactModels
  }
}
