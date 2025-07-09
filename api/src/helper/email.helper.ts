import nodemailer from "nodemailer";
import env from "../env";

export class EmailHelper {
  constructor() {}

  private static transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: env.EMAIL_USER,
      pass: env.EMAIL_PASSWORD,
    },
  });

  static async sendEmail(email: string, subject: string, text: string) {
    const mailOptions = {
      from: env.EMAIL_USER,
      to: email,
      subject: subject,
      text: text,
    };

    await this.transporter.sendMail(mailOptions);
  }
}
