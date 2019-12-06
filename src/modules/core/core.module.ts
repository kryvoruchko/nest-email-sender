import { Module } from '@nestjs/common';
import { MailerModule } from '@nest-modules/mailer';
import mailerConfig from '../../config/mailer.config';

@Module({
  imports: [MailerModule.forRoot(mailerConfig)],
})
export class CoreModule {}
