import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Document } from "mongoose";

@Schema()
export class User extends Document {

  @ApiProperty({
    example: 'johndoe',
    description: 'The username of the user',
    uniqueItems: true,
  })
  @Prop({
    required: true,
    unique: true,
  })
  username: string;
  
  @ApiProperty({
    example: 'johndoe@email.com',
    description: 'The email of the user',
    uniqueItems: true,
  })
  @Prop({
    unique: true,
    index: true,
    required: true
  })
  email: string;
  
  @ApiProperty({
    example: 'Password123+',
    description: 'The password of the user',
  })
  @Prop({
    required: true,
    select: false
  })
  password: string;
  
  @ApiProperty({
    example: true,
    description: 'The status of the user',
    default: true,
  })
  @Prop({
    default: true
  })
  isActive: boolean;
  
  @ApiProperty({
    example: ['user'],
    description: 'The roles of the user',
    default: ['user'],
  })
  @Prop({
    required: true,
    default: ['user'],
  })
  roles: string[];

}

export const UserSchema = SchemaFactory.createForClass(User).set('timestamps', true);

UserSchema.pre('save', function(next) {
  this.email = this.email.toLowerCase().trim();
  next();
});

