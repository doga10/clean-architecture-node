import { bodyParser, newCors } from '../middlewares'

export default (app): void => {
  app.use(bodyParser)
  app.use(newCors)
}
