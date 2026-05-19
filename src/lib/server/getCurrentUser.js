import { jwtVerify } from "jose"

const jsonSecret = new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET);
export async function getCurrentUser(req) {
    try {
        const accessToken = req.cookies.get('accessToken').value

        if(!accessToken) {
            return { payload : null }
        }
        const { payload } = await jwtVerify(accessToken, jsonSecret)

        return { payload }
    } catch (error) {
        console.log(error)
    }
}