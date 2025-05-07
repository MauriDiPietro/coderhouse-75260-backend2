import { configMail, configMailHbs, transporter } from "../services/email-service.js";

export const sendMailEth = async (req, res, next) => {
  try {
    // const response = await transporter.sendMail(configMail);
    const response = await transporter.sendMail(configMailHbs);
    res.json(response);
  } catch (error) {
    next(error);
  }
};
