import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import {
  AuthServiceControllerMethods,
  SignInDto,
  SignUpDto,
} from '@app/common/types/auth';
import { AuthService } from './auth.service';

@Controller()
@AuthServiceControllerMethods()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('signin')
  async signIn(@Body() request: SignInDto) {
    return await this.authService.signIn(request);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('signup')
  async signUp(@Body() request: SignUpDto) {
    return await this.authService.signUp(request);
  }
}
