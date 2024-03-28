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
import { CreateProfesionalDto } from './dto/create-profesional.dto';
import { Profesional } from './entities/profesional.entity';

@Injectable()
export class AuthService {

  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,

    private readonly jwtService: JwtService,

    @InjectModel(Profesional.name)
    private readonly profesionalModel: Model<Profesional>,
    
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

  async createProfesional(createProfesionalDto: CreateProfesionalDto, files: {foto?: Express.Multer.File[], certificadoEstudios?: Express.Multer.File[]}) {
    
    try {

      const { password, ...profesionalData } = createProfesionalDto;

      let fotoName;
      if (files.foto) {
        fotoName = Date.now() + files.foto[0].originalname;
      }
  
      let certificadoEstudiosNames = [];
      if (files.certificadoEstudios) {
        files.certificadoEstudios.forEach(file => {
          certificadoEstudiosNames.push(Date.now() + file.originalname);
        });
      }
      
      const profesional = new this.profesionalModel( {
        ...profesionalData,
        password: bcrypt.hashSync( password, 10 ),
        foto: fotoName,
        certificadoEstudios: certificadoEstudiosNames,
      } );

      await profesional.save();

      const profesionalObject = profesional.toObject();

      delete profesionalObject.password;
  
      return {
        ...profesionalObject,
        token: this.getJwtToken({id: profesional._id})
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
    console.log(error);
    if (error.code === 11000) throw new BadRequestException(error.detail);

    throw new InternalServerErrorException('Please check server logs');
  }

}
