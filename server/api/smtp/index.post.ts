import { SentMessageInfo } from "./../../../node_modules/@types/nodemailer/index.d";
import nodemailer from "nodemailer";

export default defineEventHandler(async (event) => {
  let info = {} as SentMessageInfo;
  const { to, subject, content } = await readBody(event);

  const { emailUser, emailToken } = useRuntimeConfig();

  const transporter = nodemailer.createTransport({
    host: useRuntimeConfig().smtpHost,
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: useRuntimeConfig().emailUser, // generated ethereal user
      pass: useRuntimeConfig().emailToken, // generated ethereal password
    },
  });

  // async..await is not allowed in global scope, must use a wrapper
  async function main() {
    // send mail with defined transport object
    info = await transporter.sendMail({
      from: `"Cordaria App 🎸" <${emailUser}>`, // sender address
      to: to, // list of receivers
      subject: subject, // Subject line
      // text: "Hello world?", // plain text body
      html: content, // html body
    });
  }

  try {
    await main();

    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }

  return "Hello Nitro";
});
