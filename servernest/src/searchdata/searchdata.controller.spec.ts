import { Test, TestingModule } from '@nestjs/testing';
import { SearchdataController } from './searchdata.controller';

describe('SearchdataController', () => {
  let controller: SearchdataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SearchdataController],
    }).compile();

    controller = module.get<SearchdataController>(SearchdataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
