import { ContactModel } from '../../models/contact'

export interface LoadContacts {
  load: (user: string) => Promise<ContactModel[]>
}