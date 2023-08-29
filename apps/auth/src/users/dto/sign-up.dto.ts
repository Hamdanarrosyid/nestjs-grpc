import { SignUpDto } from '@app/common/types/auth';

export class SignUpUserDto implements SignUpDto {
  username: string;
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
}
