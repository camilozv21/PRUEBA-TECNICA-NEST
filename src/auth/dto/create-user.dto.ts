import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Matches, MaxLength, Min, MinLength } from "class-validator";


export class CreateUserDto {

  @ApiProperty({
    description: 'The username of the user',
    example:  'johndoe',
    uniqueItems: true,
  })
  @IsString()
  @MinLength(4)
  username: string;

  @ApiProperty({
    description: 'The email of the user',
    example:  'john@email.com',
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
}