import { IsString } from "class-validator";


export class SolicitudProfesionalDto {

  @IsString()
  status: string;

}