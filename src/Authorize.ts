import { Request, Response } from "express"
import { verifyToken } from "./jwt"

export async function isAuthorized(req: Request, res: Response, next: () => any) {
  const token = req.body.token || req.params.token || req.headers['token']

  if (!token) return res.status(401).send({ error: 'Not authorized' })

    console.log(token)

    const {decode}: any = await verifyToken(token)

    if(!decode) return res.status(200).json({msg: "API - Tokin invalido!!"})

    res.send({ msg: 'Usuario logado' })
    // next()
    return res.status(200).send( decode)
 


}