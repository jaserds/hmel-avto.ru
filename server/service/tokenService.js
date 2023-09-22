import jwt from 'jsonwebtoken'
import db from "../db.js"


class TokenService {
    generateTokens(payload){
        const accessToken = jwt.sign(payload, 'jaserds-java', {expiresIn: '2h'});
        const refreshToken = jwt.sign(payload, 'jaserds-python', {expiresIn: '5d'});
        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken(userID, refreshToken){
        const [tokenData, metadataUser] = await db.query(`SELECT * FROM tokenschema WHERE userID = '${userID}'`)
        if (tokenData.length !== 0) {
            const [tokenDat, metUser] = await db.query( `UPDATE tokenschema SET refreshToken = '${refreshToken}' WHERE (userID = '${userID}')`)
            return tokenDat
        }
        const [token, metUs] = await db.query(`INSERT INTO tokenschema (userID, refreshToken) VALUES ('${userID}', '${refreshToken}');`)
        return token
    }

    validateAccessToken(token){
        try {
            const userData = jwt.verify(token, 'jaserds-java')
            return userData
        } catch (e){
            return null
        }
    }

    validateRefreshToken(token){
        try {
            const userData = jwt.verify(token, 'jaserds-python')
            return userData
        } catch (e){
            return null
        }
    }

    async removeToken(refreshToken){
        const [remodeT, md] = await db.query(`DELETE FROM tokenschema WHERE (refreshToken = '${refreshToken}')`)
        return remodeT
    }

    async findToken(refreshToken){
        const [tokenFromDB, modss] = await db.query(`SELECT * FROM tokenschema WHERE refreshToken = '${refreshToken}'`)
        return tokenFromDB
    }
}

export default new TokenService();