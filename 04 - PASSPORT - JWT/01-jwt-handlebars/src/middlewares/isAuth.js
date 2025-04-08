export const isAuth = (req, res, next) => {
  console.log(req.session.passport);
  console.log(req.isAuthenticated());
  if (req.isAuthenticated()) return next();
  res.status(403).json({ message: "Unauthorized" });
};
