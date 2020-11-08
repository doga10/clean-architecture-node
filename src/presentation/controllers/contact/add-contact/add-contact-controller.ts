import { Controller, HttpRequest, HttpResponse, Validation, AddContact } from './add-contact-controller-protocols'
import { badRequest, serverError, noContent } from '../../../../presentation/helpers/http/http-helper'

export class AddContactController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addContact: AddContact
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      await this.addContact.add({ ...httpRequest.body, user: httpRequest.user })
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
