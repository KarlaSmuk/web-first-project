import { auth } from "express-oauth2-jwt-bearer"

export const jwtCheck = auth({
    audience: process.env.RENDER_EXTERNAL_URL + '/',
    issuerBaseURL: process.env.ISSUER_URL,
    tokenSigningAlg: 'RS256'
});