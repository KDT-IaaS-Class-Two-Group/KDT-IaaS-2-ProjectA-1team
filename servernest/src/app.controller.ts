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
      const transformedData = data.map((row: any) => {
        const transformedRow: any = {};
        for (const key in row) {
          if (row.hasOwnProperty(key)) {
            transformedRow[key] = `${row[key]}`;
          }
        }
        return transformedRow;
      });
      res.status(response.status).send(transformedData);
    } catch (error) {
      res.status(error.response?.status || 500).send(error.message || 'Error');
    }
  }

  @Post('/updateTable')
  async updateTable(@Body() body: any, @Res() res: Response) {
    const { table, data, columnsToDelete } = body; // 변경된 부분
    console.log('업데이트할 데이터:', body);
    try {
      if (columnsToDelete && columnsToDelete.length > 0) {
        // 빈 배열 확인 추가
        const response = await fetch('http://localhost:8080/deleteColumn', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ table, columns: columnsToDelete }), // 변경된 부분
        });
        const result = await response.json();
        if (!response.ok) {
          throw new Error(result.message || '컬럼 삭제 실패');
        }
        console.log('컬럼 삭제 결과:', result);
      }

      // 새로운 데이터를 데이터베이스 서버로 전송
      const updateResponse = await fetch('http://localhost:8080/updateTable', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ table, data }),
      });

      if (!updateResponse.ok) {
        const errorResponse = await updateResponse.json();
        throw new Error(errorResponse.detail || '데이터베이스 업데이트 실패');
      }

      const updateResult = await updateResponse.json();
      console.log('테이블 업데이트 결과:', updateResult);

      res
        .status(200)
        .send({ message: '테이블이 정상적으로 업데이트 되었습니다.' });
    } catch (error) {
      console.error('테이블 업데이트 중 오류 발생:', error);
      res.status(500).send({
        message: '테이블 업데이트 중 오류 발생',
        error: error.message,
      });
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
        const errorDetail = await response.json();
        throw new Error(
          errorDetail.detail || '네트워크 응답이 정상이 아닙니다.',
        );
      }
      const result = await response.json();
      console.log('Python 서버 응답:', result);
      res.status(200).json(result);
    } catch (error) {
      console.error('Python 서버 요청 중 오류 발생:', error);
      if (error.message.includes('이미 존재하는 테이블 이름입니다')) {
        res.status(500).json({ message: '중복된 테이블 이름입니다.' });
      } else {
        res
          .status(500)
          .json({ message: 'Python 서버 요청 중 오류 발생: ' + error.message });
      }
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
}
