import {dirname} from 'path';
import { fileURLToPath } from 'url';
export const __dirname = dirname(fileURLToPath(import.meta.url));

/* ------------------------------------ - ----------------------------------- */

import bcrypt from 'bcrypt';

/**
 * funcion que realiza el encriptado de contraseña a través de bcryptjs con el método hashSync. 
 * Recibe password sin encriptar,
 * retorna password encriptada
 * @param password tipo string
 * @returns password encriptada/hasheada
 */
export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

/**
 * 
 * @param {*} password contraseña proporcionada por el usuario, sin encriptar.
 * @param {*} user usuario encontrado en base de datos.
 * @returns boolean
 */
export const isValidPassword = (password, passwordHash) => bcrypt.compareSync(password, passwordHash);

/* ------------------------------------ - ----------------------------------- */

export const createResponse = (res, statusCode, data) => {
        return res.status(statusCode).json({data})
}