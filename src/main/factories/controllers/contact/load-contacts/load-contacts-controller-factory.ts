import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorator-factory'
import { makeDbLoadContacts } from '../../../usecases/contact/load-contacts/db-load-contacts-factory'
import { Controller } from '../../../../../presentation/protocols'
import { LoadContactsController } from '../../../../../presentation/controllers/contact/load-contacts/load-contacts-controller'

export const makeLoadContactsController = (): Controller => {
  const controller = new LoadContactsController(makeDbLoadContacts())
  return makeLogControllerDecorator(controller)
}
