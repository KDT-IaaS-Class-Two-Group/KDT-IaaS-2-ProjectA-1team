import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { SaveResponse, LoadResponse } from './back.interface';

@Controller('back')
export class BackController {
  private readonly backPort = 8080;
  private readonly backupPort = 3300;

  @Post('save')
  async save(): Promise<SaveResponse> {
    try {
      // 8080번 포트의 back/save로 POST 요청을 보냅니다.
      const responseFrom8080 = await fetch(
        `http://localhost:${this.backPort}/back/save`,
        {
          method: 'GET',
        },
      );

      if (!responseFrom8080.ok) {
        throw new HttpException(
          'Failed to fetch from 8080',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      const dataFrom8080: SaveResponse = await responseFrom8080.json();

      // 응답을 3300번 포트의 backup/save로 POST 요청합니다.
      const responseFrom3300 = await fetch(
        `http://localhost:${this.backupPort}/backup/save`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dataFrom8080),
        },
      );

      if (!responseFrom3300.ok) {
        throw new HttpException(
          'Failed to fetch from 3300',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      const dataFrom3300: SaveResponse = await responseFrom3300.json();

      // 3300번 포트의 응답을 클라이언트에 반환합니다.
      return dataFrom3300;
    } catch (error) {
      throw new HttpException(
        'Error processing save request',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('load')
  async load(@Body() body: { db_name: string }): Promise<LoadResponse> {
    const { db_name } = body;

    try {
      // 3300번 포트의 backup/load로 POST 요청을 보냅니다.
      const responseFrom3300 = await fetch(
        `http://localhost:${this.backupPort}/backup/load`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ db_name }),
        },
      );

      if (!responseFrom3300.ok) {
        throw new HttpException(
          'Failed to fetch from 3300',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      const dataFrom3300: LoadResponse = await responseFrom3300.json();

      // 응답을 8080번 포트의 back/load로 POST 요청합니다.
      const responseFrom8080 = await fetch(
        `http://localhost:${this.backPort}/back/load`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dataFrom3300),
        },
      );

      if (!responseFrom8080.ok) {
        throw new HttpException(
          'Failed to fetch from 8080',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      const dataFrom8080: LoadResponse = await responseFrom8080.json();

      // 8080번 포트의 응답을 클라이언트에 반환합니다.
      return dataFrom8080;
    } catch (error) {
      throw new HttpException(
        'Error processing load request',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
