import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { EnvConfiguration } from './config/app.config';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [

    ConfigModule.forRoot({
      load: [ EnvConfiguration ],
    }),

    MongooseModule.forRoot( process.env.MONGODB, {
      dbName: 'prueba-tecnica-nest'
    }),

    AuthModule,

    CommonModule,

    SeedModule,

  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
