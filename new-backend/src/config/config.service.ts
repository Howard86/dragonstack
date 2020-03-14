import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

require('dotenv').config();
@Injectable()
export class ConfigService {
  constructor(private readonly env = process.env) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];

    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }
    return value;
  }

  getPort() {
    return this.getValue('PORT', true);
  }

  isProduction() {
    const mode = this.getValue('MODE', false);
    return mode === 'PROD';
  }

  getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',

      host: this.getValue('POSTGRES_HOST'),
      port: parseInt(this.getValue('POSTGRES_PORT')),
      username: this.getValue('POSTGRES_USER'),
      password: this.getValue('POSTGRES_PASSWORD'),
      database: this.getValue('POSTGRES_DATABASE'),

      // entities: ['**/*.entity.{ts,js}'],
      autoLoadEntities: true,

      cli: {
        migrationsDir: 'src/migration',
      },

      ssl: this.isProduction(),
      synchronize: !this.isProduction(),
    };
  }

  getJwtConfig() {
    return {
      secret: this.getValue('JWT_SECRET'),
      expiresIn: parseInt(this.getValue('JWT_EXPIRES_IN')),
    };
  }
}
