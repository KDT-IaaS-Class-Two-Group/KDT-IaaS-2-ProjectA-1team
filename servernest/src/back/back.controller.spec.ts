import { Test, TestingModule } from '@nestjs/testing';
import { BackController } from './back.controller';

describe('BackController', () => {
  let controller: BackController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BackController],
    }).compile();

    controller = module.get<BackController>(BackController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
