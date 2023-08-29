import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  _id: string;
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  username: string;

  @Prop({ required: true, type: String, unique: true })
  email: string;

  @Prop({ required: true, type: String, minlength: 6 })
  @Exclude()
  password?: string;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}

export const UserScheme = SchemaFactory.createForClass(User);
