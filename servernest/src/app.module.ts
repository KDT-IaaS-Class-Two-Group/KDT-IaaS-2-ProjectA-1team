import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SearchDataController } from './searchdata/searchdata.controller';
import { BackController } from './back/back.controller';

@Module({
  imports: [],
  controllers: [AppController, SearchDataController, BackController],
  providers: [AppService],
})
export class AppModule {}
