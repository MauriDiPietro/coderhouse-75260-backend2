import { param, validationResult } from "express-validator";

export const validatorParams = [
    param('id', 'Debes enviar un id con mas de 10 caracteres')
        .isLength({ min: 10 }),
        (req, res, next)=>{
            try {
               validationResult(req).throw()
               return next() 
            } catch (error) {
                res.status(400).send(error)
            }
        }
]