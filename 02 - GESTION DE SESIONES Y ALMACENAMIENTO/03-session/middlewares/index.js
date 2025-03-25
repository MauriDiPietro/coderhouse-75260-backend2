export const validateLogin = (req, res, next) => {
  if (req.session.info && req.session.info.loggedIn) return next();
  res.status(401).json({ message: "No autorizado" });
};

export const isAdmin = (req, res, next) => {
  if (req.session.info && req.session.info.admin) return next();
  res
    .status(403)
    .json({ message: "no tenes permisos para ingresar a esta ruta" });
};
