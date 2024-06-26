import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';

import * as bcrypt from "bcrypt";

import { User } from './entities/user.entity';
import { LoginUserDto } from './dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { CreateProfesionalDto } from './dto/create-profesional.dto';
import { Profesional } from './entities/profesional.entity';
import validator from 'validator';
import { RateProfesional } from './entities/rateProfesional.entity';
import { RateProfesionalDto } from './dto/rate-profesional.dto';
import { SolicitudProfesional } from './entities/solicitudProfesional.entity';
import { SolicitudProfesionalDto } from './dto/aprobar-profesional.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateProfesionalDto } from './dto/update-profesional.dto';

@Injectable()
export class AuthService {

  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,

    private readonly jwtService: JwtService,

    @InjectModel(Profesional.name)
    private readonly profesionalModel: Model<Profesional>,

    @InjectModel(RateProfesional.name)
    private readonly rateProfesionalModel: Model<RateProfesional>,

    @InjectModel(SolicitudProfesional.name)
    private readonly solicitudProfesionalModel: Model<SolicitudProfesional>,
    
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
    
    let user: User | Profesional;
    const { email, password } = loginUserDto;

    user = await this.userModel
      .findOne({ email })
      .select('email password _id');

    if (!user) {
      user = await this.profesionalModel
        .findOne({ email })
        .select('email password _id');
        if (!user)
          throw new UnauthorizedException('Invalid credentials (email)');
    }

    if (!bcrypt.compareSync( password, user.password )) 
      throw new UnauthorizedException('Invalid credentials (password)');

    return {
      user,
      token: this.getJwtToken({ id: user._id })
    };
  }

  async findByTerm(term: string) {
    try {
      term = validator.escape(term);

      let profesional: Profesional[];

      if ( !profesional ) {
        profesional = await this.profesionalModel.find({ ubicacion: term }).select('email ubicacion categoriasTrabajo')
        .populate('rateId');
      }

      if ( !profesional || profesional.length === 0) {
        const regex = new RegExp(term, 'i');
        profesional = await this.profesionalModel.find({ categoriasTrabajo: { $regex: regex } }).select('email ubicacion categoriasTrabajo')
        .populate('rateId');
      }

      return profesional;

    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async rateProfesional(id: string, rateProfesionalDto: RateProfesionalDto, userId: string) {
    try {
      const profesional = await this.profesionalModel.findById<Profesional>(id);
  
      if (!profesional) {
        throw new BadRequestException('Profesional not found');
      }
  
      let calificacion = await this.rateProfesionalModel.findOne({ profesionalId: id, userId: userId });

      if (calificacion) {
        calificacion.calificacion = rateProfesionalDto.calificacion;
      } else {
        calificacion = new this.rateProfesionalModel({
          profesionalId: id,
          userId: userId,
          calificacion: rateProfesionalDto.calificacion,
          comentario: rateProfesionalDto.comentario,
        });
      }
  
      await calificacion.save();

      profesional.rateId = calificacion._id;
      await profesional.save();
  
      return calificacion;

    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async solicitudProfesional(id: string, userId: string) {
    try {
      const solicitud = new this.solicitudProfesionalModel({ userId, profesionalId: id});
      await solicitud.save();
      return solicitud;
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async activateProfesional(id: string) {
    try {
      const profesional = await this.profesionalModel.findByIdAndUpdate<Profesional>(id, { isActive: true }, { new: true });
      if (!profesional) {
        throw new Error('Profesional not found');
      }
      return profesional;
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    try {

      if (updateUserDto.password) {
        updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
      }
  
      const user = await this.userModel.findByIdAndUpdate<User>(id, updateUserDto, { new: true });
  
      if (!user) {
        throw new Error('User not found');
      }
  
      return user;
      
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async updateProfesional(id: string, updateProfesionalDto: UpdateProfesionalDto) {
    try {

      if (updateProfesionalDto.password) {
        updateProfesionalDto.password = await bcrypt.hash(updateProfesionalDto.password, 10);
      }
  
      const profesional = await this.profesionalModel.findByIdAndUpdate<Profesional>(id, updateProfesionalDto, { new: true });
  
      if (!profesional) {
        throw new Error('profesional not found');
      }
  
      return profesional;
      
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async findById(id: string) {
    try {
      
      let user: User | Profesional;

      user = await this.userModel.findById<User>(id);
      if (!user) {
        user = await this.profesionalModel.findById<Profesional>(id);
      }

      if (!user) {
        throw new Error('User not found');
      }

      return user;
      
    } catch (error) {
      this.handleDBErrors(error);
    }
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
