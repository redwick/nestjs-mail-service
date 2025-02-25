import { Body, Controller, Post } from '@nestjs/common';
import { MailService } from './mail.service';
import { Mail } from './mail';

@Controller('vacancyResponse')
export class MailController {
  constructor(private mail: MailService) {}
  @Post()
  vacancyResponse(@Body() vacancy: any) {
    const toEmail: string = process.env.MAIL_TO;
    const responseText =
      'Уважаем(ый/ая) ' +
      vacancy.surname.trim() +
      ' ' +
      vacancy.name.trim() +
      '. Спасибо что обратили внимание на нашу вакансию "' +
      vacancy.vacancyName.trim() +
      '". В течение трёх рабочих дней ваша кандидатура будет рассмотрена и вы получите ответ письмом на электронную почту ' +
      vacancy.email.trim();
    this.mail.sendMail(
      new Mail(vacancy.email.trim(), 'Резюме отправлено', responseText, []),
    );
    let files = '';
    vacancy.detailsFile.forEach((file) => {
      const split = file.split('/');
      files =
        files +
        '<p>Прилагаемые файлы:</p><a href="' +
        file +
        '" target="_blank">' +
        split[split.length - 1] +
        '</a>';
    });
    const requestVacancy =
      '<p>Поступил новый отклик на вакансию "' +
      vacancy.vacancyName.trim() +
      '" от ' +
      vacancy.surname.trim() +
      ' ' +
      vacancy.name.trim() +
      ', email: ' +
      vacancy.email.trim() +
      ', тел. ' +
      vacancy.phone +
      '</p>' +
      files;
    this.mail.sendMail(
      new Mail(
        toEmail,
        'Новый отклик на вакансию',
        requestVacancy,
        vacancy.detailsFile,
      ),
    );
    return JSON.stringify('success');
  }
}
