import passport from "passport";
import { Strategy as GithubStrategy } from "passport-github2";
import { userService } from "../../services/user-service.js";

const strategyConfig = {
  clientID: "Iv23lirICJJBq6oTY8du", //process.env.CLIENT_ID
  clientSecret: "6a96cb242a959759f953cc48e7c11db98101b6c3",
  callbackURL: "http://localhost:8080/users/profile",
};

const registerOrLogin = async (accessToken, refreshToken, profile, done) => {
  console.log("accessToken", accessToken);
  console.log("profile", profile);
  try {
    const email = profile._json.email;
    const user = await userService.getByEmail(email);
    if (user) return done(null, user);

    const newUser = await userService.register({
      first_name: profile._json.name.split(" ")[0],
      last_name:
        profile._json.name.split(" ").length > 2
          ? `${profile._json.name.split(" ")[1]} ${
              profile._json.name.split(" ")[2]
            }`
          : profile._json.name.split(" ")[1],
      //["Mauri", "Di", "Pietro"]
      email,
      age: 0,
      password: " ",
      isGithub: true,
    });

    return done(null, newUser);
  } catch (error) {
    return done(error, false, { message: error.message });
  }
};

passport.use("github", new GithubStrategy(strategyConfig, registerOrLogin));

/*
express-session --> req --> session (req.session)
passport ---> req --> req.session.passport
serialize --> req.session.passport.user = user._id
*/

passport.serializeUser((user, done) => {
  try {
    done(null, user._id); //--> req.session.passport.user
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
