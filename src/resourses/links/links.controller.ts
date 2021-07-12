import { Controller, Get, Post, Put, Res, Req, Param } from '@nestjs/common';
import { Response } from 'express';
import { customRequest } from '../../interfaces/customRequest';
import { LinksService } from './links.service';

@Controller('links')
export class LinksController {
  constructor(private linksService: LinksService) {}

  @Get()
  async findAll(@Res() res: Response): Promise<void> {
    const shortLinksList = await this.linksService.readLinksList();
    res.json(shortLinksList);
  }

  @Get('/userList')
  async findUserList(@Req() req: customRequest, @Res() res: Response): Promise<void> {
    const userId = req.auts?.userId;
    const userList = await this.linksService.readUserList(+userId);
    res.json(userList);
  }

  @Get('/:tag')
  async findByTag(@Res() res: Response, @Param() params: {tag: string}): Promise<void> {
    const tagName = params.tag;
    const shortLinksList = await this.linksService.readLinksListByTag(tagName);
    res.json(shortLinksList);
  }

  @Post()
  async add(@Req() req: customRequest, @Res() res: Response): Promise<void> {
    const { body } = req;
    const userId = req.auts?.userId;

    const shortLink = await this.linksService.addLink(body, +userId);

    res.json(shortLink);
  }

  @Put()
  async update(@Req() req: customRequest, @Res() res: Response): Promise<void> {
    const { body } = req;

    const shortLink = await this.linksService.renameLink(body);

    res.json(shortLink);
  }
}
