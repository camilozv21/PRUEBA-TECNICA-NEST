import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class User extends Document {

  @Prop({
    required: true,
  })
  username: string;

  @Prop({
    unique: true,
    index: true,
    required: true
  })
  email: string;

  @Prop({
    required: true,
    select: false
  })
  password: string;

  @Prop({
    default: true
  })
  isActive: boolean;

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

