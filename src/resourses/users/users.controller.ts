import { Controller, Get, Post, Res, Req, Param } from '@nestjs/common';
import { Response, Request } from 'express';
import { UserService } from './users.service';
import { AuthorizeService } from "./../authorize/authorize.service";

@Controller('users')
export class UserController {
  constructor(private userService: UserService, private authorizeService: AuthorizeService) {}

  @Get()
  async findAll(@Res() res: Response): Promise<void> {
    const usersList = await this.userService.read();
    res.json(usersList);
  }

  @Get(':id')
  async findById(@Res() res: Response, @Param() params: {id: string}): Promise<void> {
    const userId = params.id;
    const user = await this.userService.readUserById(+userId);
    res.json(user);
  }

  @Post()
  async add(@Req() req: Request, @Res() res: Response): Promise<void> {
    const { body } = req;

    await this.userService.add(body);

    const login = body.login;
    const password = body.password;
    const userId = await this.authorizeService.logIn(login, password);

    if (+userId) {
      const sessionId = await this.authorizeService.create(+userId);
      const dayInMs = 86400000;

      res.cookie('session', sessionId, {
        maxAge: dayInMs
      });

      res.status(200).json(true);
    }
  }
}

