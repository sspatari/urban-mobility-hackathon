// src/config/config.service.ts
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import dotenv from 'dotenv-safe';

dotenv.config();

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing: boolean = true): string {
    const value: string = this.env[key]!;
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value!;
  }

  ensureValues(keys: string[]): ConfigService {
    keys.forEach((k: string) => this.getValue(k, true));
    return this;
  }

  getPort(): string {
    return this.getValue('PORT', true);
  }

  getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',

      host: this.getValue('POSTGRES_HOST'),
      port: parseInt(this.getValue('POSTGRES_PORT'), 10),
      username: this.getValue('POSTGRES_USER'),
      password: this.getValue('POSTGRES_PASSWORD'),
      database: this.getValue('POSTGRES_DATABASE'),

      entities: ['**/*.entity{.ts,.js}'],
      synchronize: true,
    };
  }
}

export const configService: ConfigService = new ConfigService(
  process.env,
).ensureValues([
  'POSTGRES_HOST',
  'POSTGRES_PORT',
  'POSTGRES_USER',
  'POSTGRES_PASSWORD',
  'POSTGRES_DATABASE',
]);
