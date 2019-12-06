import { Injectable } from '@nestjs/common';
import { MailerService } from '@nest-modules/mailer';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  sendEmail() {
    this.mailerService
      .sendMail({
        to: 'test@test.com',
        subject: 'Test email',
        template: 'email',
      })
      .then(console.log)
      .catch(console.error);

    return 'Done';
  }
}
