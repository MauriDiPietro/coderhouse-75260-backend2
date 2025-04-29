export const validatorJS = (req, res, next) => {
    const errors = [];

    const user = req.body

    if(!user.first_name || user.first_name.length < 2) {
        errors.push("El nombre es obligatorio y debe tener al menos 2 caracteres")
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!user.email || !emailRegex.test(user.email)){
        errors.push("El email es obligatorio y debe ser válido")
    }

    ////..........

    if(errors.length) return res.status(400).send(errors)
    return next()
}