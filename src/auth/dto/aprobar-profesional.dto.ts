import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";


export class SolicitudProfesionalDto {

  @ApiProperty({
    description: 'The status of the profesional, needs to be activated by the soporte',
    default: 'pendiente',
  })
  @IsString()
  status: string;

}