import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Profesional } from 'src/auth/entities/profesional.entity';
import { User } from 'src/auth/entities/user.entity';
import { initialData } from './data/deed-data';

@Injectable()
export class SeedService {
 
  constructor(

    @InjectModel(User.name)
    private readonly userModel: Model<User>,

    @InjectModel(Profesional.name)
    private readonly profesionalModel: Model<Profesional>,
  ) {}


  async runSeed() {

    await this.deleteTables();
    await this.insertUsers();
    await this.insertProfesionals();

    return 'SEED EXECUTED - password: Abc123+';
  }

  private async deleteTables() {
    await this.userModel.deleteMany({});
    await this.profesionalModel.deleteMany({});
  }

  private async insertUsers() {
    const seedUsers = initialData.users;
    
    const users: User[] = [];
  
    for (const user of seedUsers) {
      const newUser = new this.userModel(user);
      users.push(newUser);
      await newUser.save();
    }
  
    return users[0];
  }

  private async insertProfesionals() {
    const seedProfesionales = initialData.profesionals;
    
    const profesionales: Profesional[] = [];
  
    for (const profesional of seedProfesionales) {
      const newUser = new this.profesionalModel(profesional);
      profesionales.push(newUser);
      await newUser.save();
    }
  
    return profesionales[0];
  }


}
