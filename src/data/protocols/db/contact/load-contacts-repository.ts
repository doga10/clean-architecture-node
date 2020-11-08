import { ContactModel } from '../../../../domain/models/contact'

export interface LoadContactsRepository {
  load: (string: string) => Promise<ContactModel[]>
}
