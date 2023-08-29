import { Observable } from 'rxjs';
// import { User } from '../entities/user.entity';
// import { findOneUserDto } from 'apps/auth/src/users/dto';
import { User } from 'apps/auth/src/users/entities/user.entity';

export interface Users {
  users: User[];
}

export interface UsersServiceClient {
  // findOneUsers(request: findOneUserDto): Observable<User>;
  findAllUsers(request: object): Observable<Users>;
}
