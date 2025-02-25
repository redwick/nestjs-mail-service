import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailModule } from './mail/mail.module';
import { FilesModule } from './files/files.module';

@Module({
  imports: [MailModule, FilesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
