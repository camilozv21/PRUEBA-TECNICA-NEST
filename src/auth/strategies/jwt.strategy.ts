import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "../entities/user.entity";
import { JwtPayload } from "../interfaces/jwt-payload.interface";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ConfigService } from "@nestjs/config";
import { Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class JwtStrategy extends PassportStrategy( Strategy ) {

  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,

    configService: ConfigService,
  ) {

    super({
      secretOrKey: configService.get('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    })
  }

  async validate( payload: JwtPayload): Promise<User> {

    const { id } = payload;

    const user = await this.userModel.findOne({ _id: id });

    if (!user) 
      throw new UnauthorizedException('Invalid token');

    if (!user.isActive)
      throw new UnauthorizedException('Inactive user, talk with an admin');

    return user;
  }
}