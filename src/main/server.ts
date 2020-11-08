import { MongoHelper } from '../infra/db/mongodb/helpers'
import env from './config/env'

MongoHelper.connect(env.mongoUrl)
  .then(async () => {
    const app = (await import('./config/app')).default
    await app.start(+env.port)
    console.log('started')
  })
  .catch(console.error)