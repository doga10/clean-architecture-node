import { makeAddContactValidation } from './add-contact-validation-factory'
import { ValidationComposite, RequiredFieldValidation } from '../../../../../validation/validators'
import { Validation } from '../../../../../presentation/protocols/validation'

jest.mock('../../../../../validation/validators/validation-composite')

describe('AddContactValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeAddContactValidation()
    const validations: Validation[] = []
    for (const field of ['name', 'phone']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
