import { Controller, Get, Render, Res, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { TimingInterceptor } from './interceptor';

@Controller()
@UseInterceptors(TimingInterceptor)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  @Render('index.hbs')
  root() {}

  @Get('/index')
  @Render('index.hbs')
  registration(@Res() res: Response) {
    return res.render('index.hbs', {
      responseTime: String(res.locals.responseTime),
    });
  }

  @Get('/Menu')
  @Render('Menu.hbs')
  Menu(@Res() res: Response) {
    return res.render('Menu.hbs', {
      isMenu: true,
      responseTime: String(res.locals.responseTime),
    });
  }

  @Get('/NewWork')
  @Render('NewWork.hbs')
  NewWork(@Res() res: Response) {
    return res.render('NewWork.hbs', {
      isNewWork: true,
      responseTime: String(res.locals.responseTime),
    });
  }

  @Get('/ToDo')
  @Render('ToDo.hbs')
  ToDo(@Res() res: Response) {
    return res.render('ToDo.hbs', {
      isToDo: true,
      responseTime: String(res.locals.responseTime),
    });
  }
}
