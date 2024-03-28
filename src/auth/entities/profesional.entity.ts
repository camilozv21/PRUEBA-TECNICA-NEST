import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Profesional extends Document {

  @Prop({
    required: true,
  })
  username: string;

  @Prop({
    unique: true,
    index: true,
    required: true
  })
  email: string;

  @Prop({
    required: true,
    select: false
  })
  password: string;

  @Prop({
    default: true
  })
  isActive: boolean;

  @Prop({
    required: true,
    default: ['user', 'profesional'],
  })
  roles: string[];

  @Prop({
    required: false,
  })
  foto: string;

  @Prop({
    required: true,
    unique: true,
  })
  documentoIdentidad: string;

  @Prop({
    required: false,
  })
  certificadoEstudios: string[];

}

export const ProfesionalSchema = SchemaFactory.createForClass(Profesional);

ProfesionalSchema.pre('save', function(next) {
  this.email = this.email.toLowerCase().trim();
  next();
});

