import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Controller('searchData')
export class SearchDataController {
  @Get()
  async findAll() {
    const externalApiUrl = 'http://localhost:8080/searchData';

    try {
      const response = await fetch(externalApiUrl);
      if (!response.ok) {
        throw new HttpException(
          'Failed to fetch data from external API',
          HttpStatus.BAD_REQUEST,
        );
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw new HttpException(
        'Failed to fetch data from external API',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('verify')
  async verify(@Body() sendData: { id: string; password: string }) {
    const externalApiUrl = 'http://localhost:8080/searchData/verify';

    try {
      const response = await fetch(externalApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sendData),
      });

      if (!response.ok) {
        throw new HttpException(
          'Failed to fetch data from external API',
          HttpStatus.BAD_REQUEST,
        );
      }

      const result = await response.json();

      // Ensure that the result is a boolean
      if (typeof result !== 'boolean') {
        throw new HttpException(
          'Invalid response from external API',
          HttpStatus.BAD_REQUEST,
        );
      }

      return result;
    } catch (error) {
      throw new HttpException(
        'Failed to process request',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
