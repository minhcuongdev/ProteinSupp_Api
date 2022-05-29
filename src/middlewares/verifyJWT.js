import jwt from 'jsonwebtoken'
import { env } from '*/configs/environments'

const verify = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, env.SECRET_JWT_TOKEN, (err, data) => {
            if(err) return res.status(401).json('Token is not valid')
            req.user = data
            next()
        })
    }
    else {
        res.status(401).json('You are not authenticated !');
    }
}

export default verify