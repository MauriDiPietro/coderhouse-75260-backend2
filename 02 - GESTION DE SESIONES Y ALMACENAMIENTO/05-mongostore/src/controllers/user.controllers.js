const users = [
    {
      username: 'Guillermo',
      password : '1234',
      admin: true,
    },
    {
      username: 'Juan',
      password : '12345',
      admin: false,
    }
]

export const login = (req, res) => {
    const { username, password } = req.body;
    const index = users.findIndex((aUser) => aUser.username === username && aUser.password === password);
    console.log(index)
    if(index < 0)
      res.status(401).json({ msg: 'no estas autorizado' });
    else {
      const user = users[index];
      req.session.info = {
        loggedIn: true,
        contador : 1,
        username : user.username,
        admin : user.admin,
      };
      res.json({msg: 'Bienvenido!!'})
    }
}

//este controlador se ejecuta como una visita a la web
export const visit = (req, res) => {
    req.session.info.contador++;
    res.json({
      msg: `${req.session.info.username} ha visitado el sitio ${req.session.info.contador} veces`,
    });
}

export const logout = (req, res) => {
    req.session.destroy((err) => {
      if (!err) res.send('Logout ok!');
      else res.send({ status: 'Logout ERROR', body: err });
    });
}

//para ver la info de la sesion del usuario logueado
export const infoSession = (req, res) => {
    res.send({
      session: req.session,
      sessionId: req.sessionID, //id de la sesion que genera mongo (id del documento correspondiente a la sesion)
      cookies: req.cookies,
    });
}

