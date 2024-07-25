import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SearchDataController } from './searchdata/searchdata.controller';

@Module({
  imports: [],
  controllers: [AppController, SearchDataController],
  providers: [AppService],
})
export class AppModule {}
