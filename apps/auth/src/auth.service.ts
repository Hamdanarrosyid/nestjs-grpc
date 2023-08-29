import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users/users.service';
import * as bcrypt from 'bcrypt';
import { SignInDto, SignUpDto } from '@app/common/types/auth';
import { User } from './users/schemas/user.schema';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<User | null> {
    const user = await this.usersService.findOneByEmail(email);
    const isPasswordMatch = await bcrypt.compare(pass, user.password);
    if (user && isPasswordMatch) {
      return user;
    }
    return null;
  }

  async signUp(createUserDto: SignUpDto): Promise<User> {
    const saltRound = 10;
    createUserDto.password = await bcrypt.hash(
      createUserDto.password,
      saltRound,
    );
    const data = await this.usersService.create(createUserDto);
    return new User({
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      username: data.username,
    });
  }

  async signIn(signInDto: SignInDto): Promise<{ access_token: string }> {
    const user = await this.validateUser(signInDto.email, signInDto.password);
    if (user) {
      const payload = { sub: user._id, email: user.email };
      return { access_token: await this.jwtService.signAsync(payload) };
    } else throw new UnauthorizedException();
  }
}
