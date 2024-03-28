import { IsMongoId, IsNumber, IsOptional, IsString, Max, MaxLength, Min, MinLength } from "class-validator";


export class RateProfesionalDto {

  @IsNumber()
  @IsOptional()
  @Min(1)
  @Max(5)
  calificacion?: number;

  @IsString()
  @IsOptional()
  @MinLength(1)
  @MaxLength(100)
  comentario?: string;

  @IsString()
  @IsOptional()
  @IsMongoId()
  userId: string;

  @IsString()
  @IsOptional()
  @IsMongoId()
  profesionalId: string;
}