import { Exclude } from 'class-transformer';
import { IsEmail } from 'class-validator';

export class UserEntity {
  id: string;
  firstName: string;
  lastName: string;
  username: string;

  @Exclude()
  password: string;

  @IsEmail()
  email: string;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
