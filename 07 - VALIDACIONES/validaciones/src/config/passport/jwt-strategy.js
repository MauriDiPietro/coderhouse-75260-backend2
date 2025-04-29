import passport from "passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { userService } from "../../services/user-service.js";
import "dotenv/config";

/* ------------------------------------ extraer token desde headers ----------------------------------- */
const strategyConfig = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

const verifyToken = async (jwt_payload, done) => {
  // req.user = jwt_payload
  if (!jwt_payload) return done(null, false, { messages: "Invalid Token" });
  return done(null, jwt_payload);
};

passport.use("jwt", new Strategy(strategyConfig, verifyToken));

/* ------------------------------------ extraer token desde cookies ----------------------------------- */

const cookieExtractor = (req) => {
  return req.cookies.token;
};

const strategyConfigCookies = {
    jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
    secretOrKey: process.env.JWT_SECRET
};

passport.use('jwt-cookies', new Strategy(strategyConfigCookies, verifyToken));

/* ------------------------------------ serialize y deserialize va siempre ----------------------------------- */

passport.serializeUser((user, done) => {
  try {
    // console.log(user)
    done(null, user._id);
  } catch (error) {
    done(error);
  }
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await userService.getById(id);
    return done(null, user);
  } catch (error) {
    done(error);
  }
});
