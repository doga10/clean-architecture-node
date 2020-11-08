import { ContactModel } from '../../models/contact'

export type AddContactParams = Omit<ContactModel, 'id'>

export interface AddContact {
  add: (contact: AddContactParams) => Promise<ContactModel>
}