import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsNumber, IsOptional, IsString, Max, MaxLength, Min, MinLength } from "class-validator";


export class RateProfesionalDto {

  @ApiProperty({
    description: 'The calificacion of the profesional 1-5',
    example:  4.2,
  })
  @IsNumber()
  @IsOptional()
  @Min(1)
  @Max(5)
  calificacion?: number;

  @ApiProperty({
    description: 'The comentario of the profesional',
    example:  'Excelente profesional',
  })
  @IsString()
  @IsOptional()
  @MinLength(1)
  @MaxLength(100)
  comentario?: string;

  @ApiProperty({
    description: 'The userId of the user',
    example:  '60b0c6c2d1f1f80015f4e5d0',
  })
  @IsString()
  @IsOptional()
  @IsMongoId()
  userId: string;

  @ApiProperty({
    description: 'The profesionalId of the profesional',
    example:  '60b0c6c2d1f1f80015f4e5d0',
  })
  @IsString()
  @IsOptional()
  @IsMongoId()
  profesionalId: string;
}