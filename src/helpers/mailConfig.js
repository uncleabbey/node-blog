import nodemailer from "nodemailer";
import { config } from "dotenv";

config();

const transport = nodemailer.createTransport({
  service: "Yahoo",
  secure: true,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASSWORD,
  },
});

export default transport;
