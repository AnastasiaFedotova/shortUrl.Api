import { Controller, Get, Post, Delete, Res, Req } from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthorizeService } from "./authorize.service";

@Controller('authorize')
export class AuthorizeController {
  constructor(private authorizeService: AuthorizeService) {}

  @Get()
  async find(@Res() res: Response, @Req() req: Request): Promise<void> {
    const sessionId = req.cookies.session;
    const session = await this.authorizeService.find(sessionId);
    if (session) res.json(session.user_id).status(200);
    else res.status(404).send("Error");
  }

  @Get('/user')
  async findById(@Res() res: Response, @Req() req: Request): Promise<void> {
    const sessionId = req.cookies.session;
    const userId = await this.authorizeService.findAuthUserId(sessionId);
    if (userId) res.json(userId).status(200);
    else res.status(404).send("Error");
  }

  @Post()
  async add(@Req() req: Request, @Res() res: Response): Promise<void> {
    const { body } = req;
    const login = body.login;
    const password = body.password;
    const userId = await this.authorizeService.logIn(login, password);

    if (userId) {
      const sessionId = await this.authorizeService.create(+userId);
      const dayInMs = 86400000;

      res.cookie('session', sessionId, {
        maxAge: dayInMs
      });

      res.json(true).status(204);
    } else {
      res.status(404).send("Error");
    }
  }

  @Delete()
  async remove(@Req() req: Request, @Res() res: Response): Promise<void> {
    const sessionId = req.cookies.session;

    await this.authorizeService.remove(sessionId);

    res.status(200).json('deleted');
  }
}
