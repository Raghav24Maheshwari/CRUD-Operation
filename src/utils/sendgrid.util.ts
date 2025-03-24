import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as sgMail from '@sendgrid/mail';

@Injectable()
export class SendgridUtil {
  constructor(private readonly configService: ConfigService) {
    sgMail.setApiKey(this.configService.get<string>('SENDGRID_API_KEY'));
  }

  get config() {
    return {
      apiKey: this.configService.get<string>('SENDGRID_API_KEY'),
    };
  }

  async sendEmail(to: string, subject: string, text: string) {
    const msg = {
      //   to,
      to: 'developer.shantiinfosoft@gmail.com',
      from: this.configService.get<string>('SENDING_EMAIL'),
      subject,
      text,
    };
    await sgMail.send(msg);
  }
}
