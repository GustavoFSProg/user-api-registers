/* eslint-disable no-undef */
import md5 from 'md5'
import jwt from 'jsonwebtoken'

// export function encryptPassword(password) {
//   return md5(password, process.env.SECRET)
// }

// export function isEmail(email) {
//   // eslint-disable-next-line no-useless-escape
//   return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
// }

// export function isPassword(password) {
//   const valid = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}/
//   if (valid.test(password)) return true
//   return false
// }

export async function generateToken(data: any) {
  const { email, password } = data
  return await jwt.sign({ email, password },process.env.SECRET as string & { asBytes: true }, {
    expiresIn: '1d',
  })
}





// export async function decodeToken(token: any) {
//   return jwt.decode(token, process.env.SECRET as string & { asBytes: true })
// }

export function verifyToken(token: any) {
  return jwt.verify(token, process.env.SECRET as string & { asBytes: true }, (error: any, decode:any) => {
    if (error) return { error }
    return { decode }
  })
}

// export async function isUser(data) {
//   const { email, password } = data
//   const user = await User.findOne(
//     password ? { email, password: encryptPassword(password) } : { email }
//   )
//   return user
// }

// export async function createUser(data) {
//   const user = await User.create({
//     name: data.name,
//     email: data.email,
//     avatar: data.avatar || null,
//     password: encryptPassword(data.password),
//   })
//   return user
// }

// export async function getCurrentUser(email) {
//   const currentUser = await User.findOne({ email })
//   return currentUser
// }