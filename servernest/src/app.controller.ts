import { Controller, Get, Post, Body, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/tables')
  async getTables(@Req() req: Request, @Res() res: Response) {
    try {
      const response = await fetch('http://localhost:8080/tables');
      const data = await response.json();
      res.status(response.status).send(data);
    } catch (error) {
      res.status(error.response?.status || 500).send(error.message || 'Error');
    }
  }

  @Post('/data')
  async getData(@Body() body: any, @Res() res: Response) {
    try {
      const response = await fetch('http://localhost:8080/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      res.status(response.status).send(data);
    } catch (error) {
      res.status(error.response?.status || 500).send(error.message || 'Error');
    }
  }
}
