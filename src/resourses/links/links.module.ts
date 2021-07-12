import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Link } from '../../models/links';
import { LinksController } from './links.controller';
import { LinksService } from './links.service';

@Module({
  imports: [SequelizeModule.forFeature([Link])],
  providers: [LinksService],
  controllers: [LinksController],
})
export class LinksModule {}
