import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SearchdataController } from './searchdata/searchdata.controller';

@Module({
  imports: [],
  controllers: [AppController, SearchdataController],
  providers: [AppService],
})
export class AppModule {}
