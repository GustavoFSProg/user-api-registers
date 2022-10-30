import { PrismaClient } from '@prisma/client'
import { Response, Request } from 'express'
import md5 from 'md5'

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

export default { getAll, registerUser }
