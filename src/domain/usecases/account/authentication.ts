import { AuthenticationModel } from '../../models/authentication'

export type AuthenticationParams = {
  email: string
  password: string
}

export interface Authentication {
  auth: (authenticationParams: AuthenticationParams) => Promise<AuthenticationModel>
}