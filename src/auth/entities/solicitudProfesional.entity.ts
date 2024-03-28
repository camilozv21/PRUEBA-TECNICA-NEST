import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class SolicitudProfesional extends Document {

  @Prop({
    required: true,
    ref: 'User'
  })
  userId: string;

  @Prop({
    required: true,
    ref: 'Profesional'
  })
  profesionalId: string;

  @Prop({
    required: true,
    default: 'pendiente'
  })
  status: string;

}

export const SolicitudProfesionalSchema = SchemaFactory.createForClass(SolicitudProfesional).set('timestamps', true);

