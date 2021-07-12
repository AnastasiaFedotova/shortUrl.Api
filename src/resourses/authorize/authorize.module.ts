import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Session } from '../../models/sessions';
import { User } from '../../models/users';
import { UsersModule } from '../users/users.module';
import { UserService } from '../users/users.service';
import { AuthorizeController } from './authorize.controller';
import { AuthorizeService } from './authorize.service';

@Module({
  imports: [SequelizeModule.forFeature([Session, User]), UsersModule],
  providers: [AuthorizeService, UserService],
  controllers: [AuthorizeController],
})
export class AuthorizeModule {}
