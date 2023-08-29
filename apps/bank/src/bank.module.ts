import { Module } from '@nestjs/common';
import { BankController } from './bank.controller';
import { BankService } from './bank.service';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (cs: ConfigService) => {
        console.log(cs.get('MONGODB_URI'));
        console.log(join(__dirname, '../../'));
        return {
          uri: await cs.get('MONGODB_URI'),
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [BankController],
  providers: [BankService],
})
export class BankModule {}
