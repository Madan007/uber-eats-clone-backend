import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: true,
      validationSchema: Joi.object({
        DB_TYPE: Joi.string().required(),
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASS: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        POSTGRES_SYNC: Joi.boolean().required(),
        JWT_SECRET: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        APP_EXPIRES: Joi.number().required(),
        APP_PORT: Joi.number().required(),
      }),
    }),
  ],
})
export class ConfigurationModule {}
