import { DbAddContact } from './db-add-contact'
import { AddContactRepositorySpy } from '../../../test'
import { throwError, mockAddContactParams } from '../../../../domain/test'

type SutTypes = {
  sut: DbAddContact
  addContactRepositorySpy: AddContactRepositorySpy
}

const makeSut = (): SutTypes => {
  const addContactRepositorySpy = new AddContactRepositorySpy()
  const sut = new DbAddContact(addContactRepositorySpy)
  return {
    sut,
    addContactRepositorySpy
  }
}

describe('DbAddContact Usecase', () => {
  test('Should call AddContactRepository with correct values', async () => {
    const { sut, addContactRepositorySpy } = makeSut()
    const contactData = mockAddContactParams()
    await sut.add(contactData)
    expect(addContactRepositorySpy.addContactParams).toEqual(contactData)
  })

  test('Should return an contact on success', async () => {
    const { sut, addContactRepositorySpy } = makeSut()
    const contactData = mockAddContactParams()
    const contact = await sut.add(contactData)
    expect(contact).toEqual(addContactRepositorySpy.contactModel)
  })

  test('Should throw if AddContactRepository throws', async () => {
    const { sut, addContactRepositorySpy } = makeSut()
    jest.spyOn(addContactRepositorySpy, 'add').mockImplementationOnce(throwError)
    const promise = sut.add(mockAddContactParams())
    await expect(promise).rejects.toThrow()
  })
})
