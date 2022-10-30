import { Router, Response, Request } from 'express'
import usersController from './usersController'

const routes = Router()


routes.get('/', (req: Request, res: Response) => {
  return res.send({msg: ` 🎅 Api Running`})
})

routes.get('/all', usersController.getAll)
routes.post('/register', usersController.registerUser)

export default routes