import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';

import * as bcrypt from "bcrypt";

import { User } from './entities/user.entity';
import { LoginUserDto } from './dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,

    private readonly jwtService: JwtService,

    private readonly confiService: ConfigService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    
    try {

      const { password, ...userData } = createUserDto;
      const user = new this.userModel( {
        ...userData,
        password: bcrypt.hashSync( password, 10 )
      } );

      await user.save();

      const userObject = user.toObject();

      delete userObject.password;
  
      return {
        ...userObject,
        token: this.getJwtToken({id: user._id})
      };
      // retornar jwt de acceso

    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    
    const { email, password } = loginUserDto;

    const user = await this.userModel
      .findOne({ email })
      .select('email password _id');

    if (!user) 
      throw new UnauthorizedException('Invalid credentials (email)');

    if (!bcrypt.compareSync( password, user.password )) 
      throw new UnauthorizedException('Invalid credentials (password)');

    return {
      user,
      token: this.getJwtToken({ id: user._id })
    };
  }

  private getJwtToken(payload: JwtPayload): string {

    return this.jwtService.sign( payload );
  }

  private handleDBErrors(error: any): never {
    if (error.code === 11000) throw new BadRequestException(error.detail);

    throw new InternalServerErrorException('Please check server logs');
  }

}
