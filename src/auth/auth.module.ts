import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { Profesional, ProfesionalSchema } from './entities/profesional.entity';
import { RateProfesional, RateProfesionalSchema } from './entities/rateProfesional.entity';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [
    ConfigModule,

    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema
      },
    ]),

    MongooseModule.forFeature([
      {
        name: Profesional.name,
        schema: ProfesionalSchema
      },
    ]),

    MongooseModule.forFeature([
      {
        name: RateProfesional.name,
        schema: RateProfesionalSchema
      },
    ]),

    PassportModule.register({ defaultStrategy: 'jwt' }),

    JwtModule.registerAsync({
      imports: [ ConfigModule ],
      inject: [ ConfigService ],
      useFactory: ( ConfigService: ConfigService ) => {
        return {
          secret: ConfigService.get('JWT_SECRET'),
          signOptions: { 
            expiresIn: '2h'
          }
        }
      }
    })

  ],
  exports: [MongooseModule, JwtStrategy, PassportModule, JwtModule]
})
export class AuthModule {}
