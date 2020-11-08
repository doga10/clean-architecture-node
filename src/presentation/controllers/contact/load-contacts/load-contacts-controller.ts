import { Controller, HttpRequest, HttpResponse, LoadContacts } from './load-contacts-controller-protocols'
import { ok, serverError, noContent } from '../../../helpers/http/http-helper'

export class LoadContactsController implements Controller {
  constructor (private readonly loadContacts: LoadContacts) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const contacts = await this.loadContacts.load(httpRequest.user.id)
      return contacts.length ? ok(contacts) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
