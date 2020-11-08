import { LoadContactsController } from './load-contacts-controller'
import { HttpRequest } from './load-contacts-controller-protocols'
import { ok, serverError, noContent } from '../../../helpers/http/http-helper'
import { LoadContactsSpy } from '../../../test'
import { throwError } from '../../../../domain/test'
import faker from 'faker'

const mockRequest = (): HttpRequest => ({ user: { id: faker.random.uuid(), name: faker.name.firstName(), email: faker.internet.email(), picture: faker.internet.url() } })

type SutTypes = {
  sut: LoadContactsController
  loadContactsSpy: LoadContactsSpy
}

const makeSut = (): SutTypes => {
  const loadContactsSpy = new LoadContactsSpy()
  const sut = new LoadContactsController(loadContactsSpy)
  return {
    sut,
    loadContactsSpy
  }
}

describe('LoadContacts Controller', () => {
  test('Should call LoadContacts with correct value', async () => {
    const { sut, loadContactsSpy } = makeSut()
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(loadContactsSpy.user).toBe(httpRequest.user.id)
  })

  test('Should return 200 on success', async () => {
    const { sut, loadContactsSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(loadContactsSpy.contactModels))
  })

  test('Should return 204 if LoadContacts returns empty', async () => {
    const { sut, loadContactsSpy } = makeSut()
    loadContactsSpy.contactModels = []
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })

  test('Should return 500 if LoadContacts throws', async () => {
    const { sut, loadContactsSpy } = makeSut()
    jest.spyOn(loadContactsSpy, 'load').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
