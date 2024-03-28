import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { EnvConfiguration } from './config/app.config';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [

    ConfigModule.forRoot({
      load: [ EnvConfiguration ],
    }),

    MongooseModule.forRoot( 'mongodb://localhost:27017/prueba-tecnica-nest', {
      dbName: 'prueba-tecnica-nest'
    }),

    AuthModule,

    CommonModule,

  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
