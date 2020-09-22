import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InfoModule } from './info/info.module';
import { UsersModule } from './users/users.module';
import { TypeOrmConfigService } from './services/type-config.service'
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
    }),
    InfoModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
