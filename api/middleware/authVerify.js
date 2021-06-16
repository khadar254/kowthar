import jwt from 'jsonwebtoken'
import { keys } from '../keys'

export const authVerify = (req, res, next) => {
    const token = req.headers['auth-token']

    if (!token) return res.status(401).send({ message: 'Access denied' })

    try {
        const verified = jwt.verify(token, keys.jwtSecret)
        req.user = verified

        next()
    } catch (error) {
        return res.status(400).send({ message: 'Invalid token' })
    }
}
