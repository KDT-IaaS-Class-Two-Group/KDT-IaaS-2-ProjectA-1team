import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { fetchUndefine } from '../nestModule/AJAXRequest'; // 경로는 실제 위치에 맞게 조정하세요

@Controller('searchData')
export class SearchDataController {
  @Post('login')
  async login(@Body() sendData: { id: string; password: string }) {
    const externalApiUrl = 'http://localhost:8080/login';
    const requestData = JSON.stringify(sendData);

    try {
      const result = await fetchUndefine({
        method: 'POST',
        url: externalApiUrl,
        data: requestData,
      });

      if (typeof result !== 'boolean') {
        throw new HttpException(
          'Invalid response from external API',
          HttpStatus.BAD_REQUEST,
        );
      }

      return result;
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to process request',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
