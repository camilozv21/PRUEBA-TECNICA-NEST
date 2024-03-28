import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Document } from "mongoose";

@Schema()
export class Profesional extends Document {
  
  @ApiProperty({
    example: 'johndoe',
    description: 'The username of the user',
    uniqueItems: true,
  })
  @Prop({
    required: true,
    unique: true,
  })
  username: string;
  
  @ApiProperty({
    example: 'johndoe@mail.com',
    description: 'The email of the user',
    uniqueItems: true,
  })
  @Prop({
    unique: true,
    index: true,
    required: true
  })
  email: string;
  
  @ApiProperty({
    example: 'Password123+',
    description: 'The password of the user',
  })
  @Prop({
    required: true,
    select: false
  })
  password: string;
  
  @ApiProperty({
    example: true,
    description: 'The status of the profesional, needs to be activated by the soporte',
    default: false,
  })
  @Prop({
    default: false
  })
  isActive: boolean;
  
  @ApiProperty({
    example: ['user', 'profesional'],
    description: 'The roles of the user',
  })
  @Prop({
    required: true,
    default: ['user', 'profesional'],
  })
  roles: string[];
  
  @ApiProperty({
    example: 'foto.jpg',
    description: 'Upload a photo of the profesional',
  })
  @Prop({
    required: false,
  })
  foto: string;
  
  @ApiProperty({
    example: '1192896906',
    description: 'The Profesional id',
    uniqueItems: true,
  })
  @Prop({
    required: true,
    unique: true,
  })
  documentoIdentidad: string;
  
  @ApiProperty({
    example: ['ceeipa.jpg', 'universidad.pdf'],
    description: 'Upload files of the profesional',
  })
  @Prop({
    required: false,
  })
  certificadoEstudios: string[];
  
  @ApiProperty({
    example: 'cocinero, programador, electricista, fullstack',
    description: 'Las categorias de trabajo del profesional',
  })
  @Prop({
    required: true,
  })
  categoriasTrabajo: string;
  
  @ApiProperty({
    example: 'colombia',
    description: 'La ubicacion del profesional',
  })
  @Prop({
    required: true,
  })
  ubicacion: string;
  
  @ApiProperty({
    example: '66058699848eef55088a726f',
    description: 'The rate id of the profesional',
  })
  @Prop({
    required: false,
    ref: 'RateProfesional',
  })
  rateId: string;

}

export const ProfesionalSchema = SchemaFactory.createForClass(Profesional).set('timestamps', true);

ProfesionalSchema.pre('save', function(next) {
  this.email = this.email.toLowerCase().trim();
  this.ubicacion = this.ubicacion.toLowerCase().trim();
  this.categoriasTrabajo = this.categoriasTrabajo.toLowerCase().trim();
  next();
});

