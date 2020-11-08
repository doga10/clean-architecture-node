import { ContactModel } from '../../../../domain/models/contact'
import { AddContactParams } from '../../../../domain/usecases/contact/add-contact'

export interface AddContactRepository {
  add: (data: AddContactParams) => Promise<ContactModel>
}
