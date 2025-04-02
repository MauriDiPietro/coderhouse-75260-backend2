import bcrypt from "bcrypt";

export const createHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  // '1234' ---> ffdg8fdg0sdfg90fdgidfgjofdkjg09u0u54tnfdkgdf564dfg4/*gf/dgdfg
};

export const isValidPassword = (passwordPlain, passwordHash) => {
  return bcrypt.compareSync(passwordPlain, passwordHash);
};

// console.log(createHash('1234'))      //$2b$10$kw3ApAxKVgqTtN0VWR3qHOaISAG.Q72herN6UflOBH5LIeTQ0nXui
// console.log(createHash('Abc./*-A556'))  //$2b$10$dWyWLu5O0LA9AF8TkSOnCO.P3EuF8oGly1.NYRn/kJSpmqYt3vY4y
                                        //$2b$15$KqaLjYoD1l/7mS1/lMTsje5w81sDrEJFF6PGRJDz/W6pHAgw5jJ1W    