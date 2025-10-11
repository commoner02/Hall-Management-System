import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken'
import { envVars } from '../config'


export const generateToken = (payload: JwtPayload)=>{
    const token = jwt.sign(payload,envVars.JWT_ACCESS_SECRET,{expiresIn:envVars.JWT_ACCESS_EXPIRES} as SignOptions)
    return token
}

export const verifyToken = (token: string)=>{
    const verifiedToken = jwt.verify(token,envVars.JWT_ACCESS_SECRET) as JwtPayload;

    return verifiedToken
}