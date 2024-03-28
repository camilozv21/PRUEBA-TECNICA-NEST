import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "../entities/user.entity";
import { JwtPayload } from "../interfaces/jwt-payload.interface";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ConfigService } from "@nestjs/config";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Profesional } from "../entities/profesional.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy( Strategy ) {

  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,

    @InjectModel(Profesional.name)
    private readonly profesionalModel: Model<Profesional>,

    configService: ConfigService,
  ) {

    super({
      secretOrKey: configService.get('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    })
  }

  async validate( payload: JwtPayload): Promise<User | Profesional> {

    const { id } = payload;

    let user = await this.userModel.findOne({ _id: id });

    if (!user) {
      user = await this.profesionalModel
        .findOne({ _id: id })
        if (!user)
          throw new UnauthorizedException('Invalid credentials (email)');
    }

    if (!user.isActive)
      throw new UnauthorizedException('Inactive user, talk with an admin');

    return user;
  }
}