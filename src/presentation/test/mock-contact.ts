import { AddContactParams, AddContact } from '../../domain/usecases/contact/add-contact'
import { LoadContacts } from '../../domain/usecases/contact/load-contacts'
import { ContactModel } from '../../domain/models/contact'
import { mockContactModels, mockContactModel } from '../../domain/test'

export class AddContactSpy implements AddContact {
  addContactParams: AddContactParams
  contactModel = mockContactModel()

  async add (data: AddContactParams): Promise<ContactModel> {
    this.addContactParams = data
    return this.contactModel
  }
}

export class LoadContactsSpy implements LoadContacts {
  contactModels = mockContactModels()
  user: string

  async load (user: string): Promise<ContactModel[]> {
    this.user = user
    return this.contactModels
  }
}
