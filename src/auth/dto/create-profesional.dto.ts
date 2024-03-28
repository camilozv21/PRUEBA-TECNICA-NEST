import { IsArray, IsEmail, IsNumber, IsOptional, IsString, Matches, MaxLength, Min, MinLength } from "class-validator";


export class CreateProfesionalDto {

  @IsString()
  @MinLength(4)
  username: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Matches(
      /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
      message: 'The password must have a Uppercase, lowercase letter and a number'
  })
  password: string;

  @IsString()
  @IsOptional()
  foto?: string;

  @IsString()
  documentoIdentidad: string;

  @IsString({ each: true })
  @IsOptional()
  @IsArray()
  certificadoEstudios?: string[];

  @IsString()
  categoriasTrabajo: string;

  @IsString()
  ubicacion: string;

  @IsString()
  @IsOptional()
  rateId: string;

}