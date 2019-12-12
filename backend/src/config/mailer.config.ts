import { HandlebarsAdapter } from '@nest-modules/mailer';

const {
  MAILER_HOST,
  MAILER_PORT,
  MAILER_FROM_EMAIL,
  MAILER_FROM_NAME,
  MAILER_AUTH_USER,
  MAILER_AUTH_PASSWORD,
} = process.env;

export const config = {
  transport: {
    host: MAILER_HOST,
    port: MAILER_PORT,
    secure: true,
    auth: {
      user: MAILER_AUTH_USER,
      pass: MAILER_AUTH_PASSWORD,
    },
  },
  defaults: {
    from: `${MAILER_FROM_NAME} <${MAILER_FROM_EMAIL}>`,
  },
  template: {
    dir: `${__dirname}/../../assets/email-templates`,
    adapter: new HandlebarsAdapter(),
  },
};

export default config;
