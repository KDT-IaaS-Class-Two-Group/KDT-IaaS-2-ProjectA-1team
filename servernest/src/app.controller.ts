import { Controller, Get, Post, Body, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller()
export class AppController {
  constructor() {}

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

  @Post('/createTable')
  async createTable(@Body() createTableDto: any, @Res() res: Response) {
    console.log('Received createTable request:', createTableDto);

    try {
      const response = await fetch('http://localhost:8080/createTable', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(createTableDto),
      });

      if (!response.ok) {
        throw new Error('네트워크 응답이 정상이 아닙니다.');
      }

      const result = await response.json();
      console.log('Python 서버 응답:', result);

      res.status(200).json(result);
    } catch (error) {
      console.error('Python 서버 요청 중 오류 발생:', error);
      res.status(500).json({ message: 'Python 서버 요청 중 오류 발생' });
    }
  }

  @Post('/createRecommend')
  async makeResponse(@Body() body: string, @Res() res: Response) {
    try {
      const response = await fetch('http://localhost:8080/createRecommend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      res.status(response.status).send(data.success);
    } catch (error) {
      res.status(error.response?.status || 500).send(error.message || 'Error');
    }
  }

  @Post('/updateTable')
  async updateTable(@Body() body: any, @Res() res: Response) {
    try {
      const response = await fetch('http://localhost:8080/updateTable', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || 'Update failed');
      }
      res.status(200).json(result);
    } catch (error) {
      console.error('테이블 업데이트 중 오류 발생:', error);
      res
        .status(500)
        .json({ message: error.message || 'Error updating table' });
    }
  }
}
