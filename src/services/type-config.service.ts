import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
    const typeOrmSecret = {
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10) || 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_DATABASE,
      entities: [
        `${require('path').resolve(__dirname, '..')}/**/*.entity{.ts,.js}`,
      ],
      synchronize: false,
      logging: process.env.NODE_ENV === 'dev', // log only in dev mode
    };
    
    return typeOrmSecret as TypeOrmModuleOptions;
  }
}
