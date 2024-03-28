import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsEmail, IsNumber, IsOptional, IsString, Matches, MaxLength, Min, MinLength } from "class-validator";


export class CreateProfesionalDto {

  @ApiProperty({
    description: 'The username of the user',
    example: 'johndoe',
  })
  @IsString()
  @MinLength(4)
  username: string;

  @ApiProperty({
    description: 'The email of the user',
    example: 'john@email.com',
    uniqueItems: true,
  })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The password of the user',
    example:  'Password123+',
  })
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Matches(
      /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
      message: 'The password must have a Uppercase, lowercase letter and a number'
  })
  password: string;

  @ApiProperty({
    description: 'The foto of the user',
    example:  'foto.jpg',
  })
  @IsString()
  @IsOptional()
  foto?: string;

  @ApiProperty({
    description: 'The documentoIdentidad of the user',
    example:  '1192896909',
    uniqueItems: true,
  })
  @IsString()
  documentoIdentidad: string;

  @ApiProperty({
    description: 'The certificados de estudio of the user',
    example:  ['certificado1.jpg', 'certificado2.jpg']
  })
  @IsString({ each: true })
  @IsOptional()
  @IsArray()
  certificadoEstudios?: string[];

  @ApiProperty({
    description: 'The categorias de trabajo of the user',
    example:  'carpinteria, plomeria, electricidad',
  })
  @IsString()
  categoriasTrabajo: string;

  @ApiProperty({
    description: 'The ubicacion of the user',
    example:  'colombia',
  })
  @IsString()
  ubicacion: string;

  @ApiProperty({
    description: 'The rateId of the user',
    example:  '5f7b7b7b7b7b7b7b7b7b7b7b',
  })
  @IsString()
  @IsOptional()
  rateId: string;

}