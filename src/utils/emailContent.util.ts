import { ConfigService } from '@nestjs/config';
import { SendgridUtil } from './sendgrid.util'; // Import SendgridUtil

export class EmailContent {
  private static getConfigService(): ConfigService {
    return new ConfigService();
  }

  private static async sendEmail(
    to: string,
    subject: string,
    text: string,
  ): Promise<void> {
    const configService = this.getConfigService();
    const sendgridUtil = new SendgridUtil(configService);
    await sendgridUtil.sendEmail(to, subject, text);
  }

  static async adminForgotPassword(
    email: string,
    name: string,
    code: string,
  ): Promise<void> {
    const subject = 'Password Reset Request';

    const message = `Dear ${name},
    You have recently requested to reset your password for your super admin account at Park Me. To proceed with the password reset process, please click the link below:
    ${this.getConfigService().get('ADMIN_URL')}/set-password/${code}
    If you did not request this password reset or if you believe this email was sent to you in error, please disregard it.
    This link will expire after 15 minutes, so please reset your password promptly.
    Best regards,
    Park Me Team`;
    await EmailContent.sendEmail(email, subject, message); 
  }
}
