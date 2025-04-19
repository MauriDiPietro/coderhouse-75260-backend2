import { Router } from "express";
const router = Router();

// router.get('/:email', (req, res)=>{
//     const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
//     const { email } = req.params;
//     if(emailRegex.test(email)) return res.send('email valido')
//     return res.status(400).send('email invalido')
// });

// router.get('/:email([A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,})', (req, res)=>{
//     res.status(200).send('email valido')
// });

router.get("/:email", (req, res) => {
  /*
    await usercontroller.getbyemail(email)
    ......
    */
  res.status(200).send("email valido");
});

router.param("email", (req, res, next, email) => {
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  const isValid = emailRegex.test(email);
  if (isValid) return next();
  return res.status(400).send("email invalido");
});

router.all("/admin/*", (req, res, next) => {
  if (!isAdmin()) return res.status(403).send("acceso denegado");
  return next();
});

router.get("*", (req, res) => {
  res.json({ message: "Ruta inexistente" });
});

export default router;
