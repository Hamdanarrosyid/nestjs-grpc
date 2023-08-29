import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserScheme } from './schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserScheme }]),
  ],
  controllers: [],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
