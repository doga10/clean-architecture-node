import { makeAddContactValidation } from './add-contact-validation-factory'
import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorator-factory'
import { makeDbAddContact } from '../../../usecases/contact/add-contact/db-add-contact-factory'
import { Controller } from '../../../../../presentation/protocols'
import { AddContactController } from '../../../../../presentation/controllers/contact/add-contact/add-contact-controller'

export const makeAddContactController = (): Controller => {
  const controller = new AddContactController(makeAddContactValidation(), makeDbAddContact())
  return makeLogControllerDecorator(controller)
}
