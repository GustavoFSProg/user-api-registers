import { PrismaClient } from '@prisma/client'
import { Response, Request } from 'express'
import md5 from 'md5'
import { generateToken, verifyToken } from './jwt'

const prisma = new PrismaClient()

async function registerUser(req: Request, res: Response) {
  try {
    const user = await prisma.users.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        password: String(md5(req.body.password, process.env.SECRET as string & { asBytes: true })),
      },
    })

    return res.status(201).json({ user })
  } catch (error) {
    return res.status(400).json({ error })
  }
}

async function getAll(req: Request, res: Response) {
  try {
    const data = await prisma.users.findMany()

    return res.status(200).send(data)
  } catch (error) {
    return res.status(400).send(error)
  }
}

async function Login(req: Request, res: Response) {
  try {
    const user = await prisma.users.findFirst({
      where: {
        email: req.body.email,
        password: String(md5(req.body.password, process.env.SECRET as string & { asBytes: true })),
      },
    })

    if (!user) return res.status(400).send({ msg: 'Email ou senha invalidos!!' })

    const token = await generateToken(user)

    return res.status(200).send({ token })
  } catch (error) {
    return res.status(400).send(error)
  }
}

async function verifyUserToken(req: Request, res: Response) {
  try {
    const token = req.headers["token"]
    // const Token = req.body.token
    // const Token = req.params.token
    
    console.log(token)
    // const Token =  req.body.token

    // req.headers["token"]

    const {decode}: any = await verifyToken(token)

    if(!decode) return res.status(200).json({msg: "API - Tokin invalido!!"})

    return res.status(200).send( decode)
  } catch (error) {
    return res.status(400).send(error)
  }
}

export default { getAll, Login, registerUser, verifyUserToken }
