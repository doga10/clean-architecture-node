import { DbLoadContacts } from './db-load-contacts'
import { LoadContactsRepositorySpy } from '../../../test'
import { throwError } from '../../../../domain/test'
import faker from 'faker'

type SutTypes = {
  sut: DbLoadContacts
  loadContactsRepositorySpy: LoadContactsRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadContactsRepositorySpy = new LoadContactsRepositorySpy()
  const sut = new DbLoadContacts(loadContactsRepositorySpy)
  return {
    sut,
    loadContactsRepositorySpy
  }
}

describe('DbLoadContacts', () => {
  test('Should call LoadContactsRepository', async () => {
    const { sut, loadContactsRepositorySpy } = makeSut()
    const user = faker.random.uuid()
    await sut.load(user)
    expect(loadContactsRepositorySpy.user).toBe(user)
  })

  test('Should return a list of contacts on success', async () => {
    const { sut, loadContactsRepositorySpy } = makeSut()
    const contacts = await sut.load(faker.random.uuid())
    expect(contacts).toEqual(loadContactsRepositorySpy.contactModels)
  })

  test('Should throw if LoadContactsRepository throws', async () => {
    const { sut, loadContactsRepositorySpy } = makeSut()
    jest.spyOn(loadContactsRepositorySpy, 'load').mockImplementationOnce(throwError)
    const promise = sut.load(faker.random.uuid())
    await expect(promise).rejects.toThrow()
  })
})
