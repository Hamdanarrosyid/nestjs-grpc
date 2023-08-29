import {
  AUTH_SERVICE_NAME,
  AuthServiceClient,
  SignInDto,
  SignUpDto,
} from '@app/common/types/auth';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class UsersService implements OnModuleInit {
  private authService: AuthServiceClient;

  constructor(@Inject('auth') private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.authService =
      this.client.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
  }

  signUp(signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  signIn(signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }
}
