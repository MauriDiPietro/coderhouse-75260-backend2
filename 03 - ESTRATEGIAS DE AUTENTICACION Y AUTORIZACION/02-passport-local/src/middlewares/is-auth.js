export const isAuth = (req, res, next) => {
    if(req.isAuthenticated()) return next();
    return res.status(401).send({status: 'error', error: 'No autorizado'});
}