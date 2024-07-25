import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';

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
}
