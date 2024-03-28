import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Document } from "mongoose";

@Schema()
export class RateProfesional extends Document {
  
  @ApiProperty({
    example: 4.6,
    description: 'The calificacion of the rate 1-5',
  })
  @Prop({
    required: false,
  })
  calificacion?: number;
  
  @ApiProperty({
    example: 'Excelente',
    description: 'El comentario de la calificacion',
  })
  @Prop({
    required: false,
  })
  comentario?: string;
  
  @ApiProperty({
    example: '66058699848eef55088a726f',
    description: 'The user id',
  })
  @Prop({
    ref: 'User',
    required: true,
  })
  userId: string;
  
  @ApiProperty({
    example: '66058699848eef55088a726f',
    description: 'The Profesional id',
  })
  @Prop({
    ref: 'Profesional',
    required: true,
  })
  profesionalId: string;

}

export const RateProfesionalSchema = SchemaFactory.createForClass(RateProfesional).set('timestamps', true);

