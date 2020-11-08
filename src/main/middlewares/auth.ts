import { adaptMiddleware } from '../adapters/node-middleware-adapter'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware-factory'

export const auth = adaptMiddleware(makeAuthMiddleware())
