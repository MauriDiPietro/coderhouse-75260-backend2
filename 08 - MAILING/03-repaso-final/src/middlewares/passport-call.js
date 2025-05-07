import passport from "passport";

export const passportCall = (strategy, options = {}) => {
  return async (req, res, next) => {
    passport.authenticate(strategy, options, (error, user, info) => {
      if (error) return next(error);
      if (!user)
        return res
          .status(401)
          .send({
            status: "error",
            error: info.messages ? info.messages : info.toString(),
          });
      req.user = user;
      next();
    })(req, res, next);
  };
};
