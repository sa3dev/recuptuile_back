import * as nodemailer from 'nodemailer';

export interface IEmailOptions {
  to: string;
  title: string;
  body: string;
}

export class MailService {
  private static async getTransport() {
    const test = await nodemailer.createTestAccount();
    return await nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: test.user,
        pass: test.pass
      }
    });
  }

  static async sendEmail(options: IEmailOptions) {
    const mailer = await MailService.getTransport();
    return await mailer.sendMail({
      from: "admin@lamobilery.fr",
      html: options.body,
      subject: options.title,
      to: options.to
    });
  }

  static async resetPassword(email: string, token: string) {
    try {
        const mailInfo = await MailService.sendEmail({
            title: "Réinitialisation de votre mot de passe",
            to: email,
            body: `<p>Pour mettre à jour votre mot de passe, merci de vous rendre à l'adresse suivante :<br />̀ 
            <div>
                <a href='${process.env.CLIENT_URL}/auth/reset-password?t=${token}'>${process.env.CLIENT_URL}/auth/reset-password</a>
            </div>
            </p>`
        });

        return {
            id: mailInfo.messageId,
            url: nodemailer.getTestMessageUrl(mailInfo)
        };
    } catch (error) {
        console.log(error)
    }
  }
}