import jwt, { JwtPayload, Secret } from 'jsonwebtoken'

const createToken = (
  payload: object,
  secret_key: Secret,
  expires_time: string
) => {
  return jwt.sign(payload, secret_key, {
    expiresIn: expires_time,
  })
}

const verifyToken = (token: string, secret_key: Secret): JwtPayload => {
  return jwt.verify(token, secret_key)
}

export const jwtHelpers = {
  createToken,
  verifyToken,
}
