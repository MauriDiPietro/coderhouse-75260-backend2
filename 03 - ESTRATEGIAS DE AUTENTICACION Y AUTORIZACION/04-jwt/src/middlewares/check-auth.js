import CustomError from "../utils/custom-error.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const checkAuthTokenHeaders = (req, res, next) => {
    try {
       const authHeader = req.get("Authorization");
       if(!authHeader) throw new CustomError("No se ha enviado el token de autenticación", 401);
       // Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVC......
       const token = authHeader.split(" ")[1];
       // ["Bearer", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVC......"]
       const payload = jwt.verify(token, process.env.JWT_SECRET);
       req.user = payload;
       next()
    } catch (error) {
        next(error)
    }
}

export const checkAuthTokenCookies = (req, res, next) => {
    try {
        const tokenCookie = req.cookies.token;
        if(!tokenCookie) throw new CustomError("No se ha enviado el token de autenticación", 401);
        const payload = jwt.verify(tokenCookie, process.env.JWT_SECRET);
        req.user = payload;
        next()
    } catch (error) {
        next(error)
    }
}