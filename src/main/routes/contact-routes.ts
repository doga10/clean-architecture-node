import { adaptRoute } from '../adapters/node-route-adapter'
import { makeAddContactController } from '../factories/controllers/contact/add-contact/add-contact-controller-factory'
import { makeLoadContactsController } from '../factories/controllers/contact/load-contacts/load-contacts-controller-factory'
import { auth } from '../middlewares/auth'

export default (router): void => {
  router.post('/contacts', auth, adaptRoute(makeAddContactController()))
  router.get('/contacts', auth, adaptRoute(makeLoadContactsController()))
}
