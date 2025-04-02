import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.render("login");
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/profile", (req, res) => {
  const user = req.session;
  res.render("profile", { user });
});

export default router;
