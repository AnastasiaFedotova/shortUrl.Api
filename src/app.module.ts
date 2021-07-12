import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import config from './../configs/appconfig';
import session from './middlewares/sessionMiddleware';
import { Comment } from './models/comments';
import { Link } from './models/links';
import { LinksTag } from './models/linksTag';
import { Session } from './models/sessions';
import { Tag } from './models/tags';
import { User } from './models/users';
import { UsersModule } from './resourses/users/users.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      ...config,
      models: [User, Tag, Session, Link, Comment, LinksTag]
    }),
    UsersModule
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(session)
      .forRoutes('/');
  }
}
