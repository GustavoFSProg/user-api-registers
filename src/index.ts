import express, {Response, Request} from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import routes from './routes'

dotenv.config()

const { PORT } = process.env

const app = express()

app.use(cors())
app.use(express.json())
// app.use((req: Request, res: Response, next) => {
//   res.header("Access-Control-Allow-Origin", "http://localhost:5173/register"),
//   res.header("Access-Control-Allow-Origin", "*"),
//     res.header("Access-Control-Allow-Method", "GET,PUT,POST,DELETE"),
//     app.use(cors()),
//     next()
    
// })
// app.use(cors())
app.use(routes)



app.listen(PORT, () => {
  console.log(` 🎅 Api Running: ${PORT}`)
})

export default app
