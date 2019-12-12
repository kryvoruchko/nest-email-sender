import { Module } from '@nestjs/common';
import { MailerModule } from '@nest-modules/mailer';
import mailConfig from '../../config/mailer.config';
import { PasswordService } from './password.service';
import { TokenService } from './token.service';

@Module({
  imports: [MailerModule.forRoot(mailConfig)],
  providers: [PasswordService, TokenService],
  exports: [PasswordService, TokenService],
})
export class CoreModule {}
