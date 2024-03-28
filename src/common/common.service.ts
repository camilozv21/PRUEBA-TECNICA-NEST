import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Profesional } from 'src/auth/entities/profesional.entity';
import { RateProfesional } from 'src/auth/entities/rateProfesional.entity';
import { SolicitudProfesional } from 'src/auth/entities/solicitudProfesional.entity';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class CommonService {

  constructor(
    
    @InjectModel(User.name)
    private readonly userModel: Model<User>,

    @InjectModel(Profesional.name)
    private readonly profesionalModel: Model<Profesional>,

    @InjectModel(RateProfesional.name)
    private readonly rateProfesionalModel: Model<RateProfesional>,

    @InjectModel(SolicitudProfesional.name)
    private readonly solicitudProfesionalModel: Model<SolicitudProfesional>,

    ) {}
  
    async getPlatformStats() {

      const totalUsers = await this.userModel.countDocuments();
      const totalProfessionals = await this.profesionalModel.countDocuments();
      const totalPendingRequests = await this.solicitudProfesionalModel.countDocuments({ status: 'pendiente' });
      const totalCalilficaciones = await this.rateProfesionalModel.countDocuments();

      return {
        totalUsers,
        totalProfessionals,
        totalPendingRequests,
        totalCalilficaciones,
      };
    }

    async getNewUsers() {
      const oneHourAgo = new Date();
      oneHourAgo.setHours(oneHourAgo.getHours() - 1);
      const newUsersLastHour = await this.userModel.countDocuments({ createdAt: { $gte: oneHourAgo } });

      const oneDayAgo = new Date();
      oneDayAgo.setDate(oneDayAgo.getDate() - 1);
      const newUsersLastDay = await this.userModel.countDocuments({ createdAt: { $gte: oneDayAgo } });

      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      const newUsersLastWeek = await this.userModel.countDocuments({ createdAt: { $gte: oneWeekAgo } });

      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      const newUsersLast30Days = await this.userModel.countDocuments({ createdAt: { $gte: thirtyDaysAgo } });

      return {
        newUsersLastHour,
        newUsersLastDay,
        newUsersLastWeek,
        newUsersLast30Days,
      };
    }
}
