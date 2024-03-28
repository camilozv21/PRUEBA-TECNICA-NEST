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
    default: false
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

  @Prop({
    required: true,
  })
  categoriasTrabajo: string;

  @Prop({
    required: true,
  })
  ubicacion: string;

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

