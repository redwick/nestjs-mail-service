import { Module } from '@nestjs/common';
import { MailController } from './mail.controller';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [MailController],
  providers: [MailService],
  imports: [
    ConfigModule.forRoot({ envFilePath: 'conf.env' }),
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          host: process.env.MAIL_HOST,
          port: process.env.MAIL_PORT,
          auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
          },
          tls: {
            rejectUnauthorized: false,
          },
        },
      }),
    }),
  ],
  exports: [MailService],
})
export class MailModule {
  constructor(private mail: MailService) {}
}
