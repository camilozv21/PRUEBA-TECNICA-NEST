import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Document } from "mongoose";

@Schema()
export class SolicitudProfesional extends Document {

  @ApiProperty({
    example: '66058699848eef55088a726f',
    description: 'The user id',
  })
  @Prop({
    required: true,
    ref: 'User'
  })
  userId: string;
  
  @ApiProperty({
    example: '66058699848eef55088a726f',
    description: 'The profesional id',
  })
  @Prop({
    required: true,
    ref: 'Profesional'
  })
  profesionalId: string;
  
  @ApiProperty({
    example: 'pendiente',
    description: 'The status of the solicitud',
    default: 'pendiente',
  })
  @Prop({
    required: true,
    default: 'pendiente'
  })
  status: string;

}

export const SolicitudProfesionalSchema = SchemaFactory.createForClass(SolicitudProfesional).set('timestamps', true);

