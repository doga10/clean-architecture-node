import { ValidationComposite, RequiredFieldValidation } from '../../../../../validation/validators'
import { Validation } from '../../../../../presentation/protocols/validation'

export const makeAddContactValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name', 'phone']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
