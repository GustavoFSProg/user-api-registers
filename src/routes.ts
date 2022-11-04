import { Router, Response, Request } from 'express'
import { isAuthorized } from './Authorize'
// import { isAuthorized } from './Authorize'
import usersController from './usersController'

const routes = Router()

routes.get('/', (req: Request, res: Response) => {
  return res.send({ msg: ` 🎅 Api Running` })
})

routes.get('/all', usersController.getAll)
routes.post('/register',isAuthorized, usersController.registerUser)
routes.post('/login', usersController.Login)
// routes.post('/verify-token', usersController.isValidToken)

export default routes
