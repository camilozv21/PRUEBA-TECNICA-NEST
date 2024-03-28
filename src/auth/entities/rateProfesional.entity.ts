import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class RateProfesional extends Document {

  @Prop({
    required: false,
  })
  calificacion?: number;

  @Prop({
    required: false,
  })
  comentario?: string;

  @Prop({
    ref: 'User',
    required: true,
  })
  userId: string;

  @Prop({
    ref: 'Profesional',
    required: true,
  })
  profesionalId: string;

}

export const RateProfesionalSchema = SchemaFactory.createForClass(RateProfesional);

