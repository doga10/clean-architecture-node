import { HttpRequest } from '../../../protocols'
import { AddContactController } from './add-contact-controller'
import { badRequest, serverError, noContent } from '../../../helpers/http/http-helper'
import { ValidationSpy, AddContactSpy } from '../../../test'
import { throwError } from '../../../../domain/test'
import faker from 'faker'

const mockRequest = (): HttpRequest => ({
  body: {
    name: faker.random.words(),
    phone: faker.phone.phoneNumber()
  },
  user: {
    id: faker.random.uuid(),
    name: faker.name.firstName(),
    email: faker.internet.email()
  }
})

type SutTypes = {
  sut: AddContactController
  validationSpy: ValidationSpy
  addContactSpy: AddContactSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const addContactSpy = new AddContactSpy()
  const sut = new AddContactController(validationSpy, addContactSpy)
  return {
    sut,
    validationSpy,
    addContactSpy
  }
}

describe('AddContactController', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut()
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(validationSpy.input).toEqual(httpRequest.body)
  })

  test('Should return 400 if Validation fails', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.error = new Error()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(validationSpy.error))
  })

  test('Should call AddSurvey with correct values', async () => {
    const { sut, addContactSpy } = makeSut()
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(addContactSpy.addContactParams).toEqual({ ...httpRequest.body, user: httpRequest.user })
  })

  test('Should return 500 if AddSurvey throws', async () => {
    const { sut, addContactSpy } = makeSut()
    jest.spyOn(addContactSpy, 'add').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })
})
