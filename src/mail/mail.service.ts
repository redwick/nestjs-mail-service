import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Mail } from './mail';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  sender = process.env.MAIL_SENDER;
  constructor(
    private mailer: MailerService,
    private conf: ConfigService,
  ) {}
  sendMail(mail: Mail) {
    this.mailer
      .sendMail({
        to: mail.toEmail,
        from: this.sender,
        subject: mail.subject,
        html: mail.text,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
