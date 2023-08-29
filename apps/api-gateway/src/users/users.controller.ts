import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/signup')
  signUp(@Body() body) {
    return this.usersService.signUp(body);
  }

  @Post('signin')
  signIn(@Body() body) {
    return this.usersService.signIn(body);
  }
}
