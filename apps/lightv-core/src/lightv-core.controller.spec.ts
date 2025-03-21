import { Test, TestingModule } from '@nestjs/testing';
import { LightvCoreController } from './lightv-core.controller';
import { LightvCoreService } from './lightv-core.service';

describe('LightvCoreController', () => {
  let lightvCoreController: LightvCoreController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [LightvCoreController],
      providers: [LightvCoreService],
    }).compile();

    lightvCoreController = app.get<LightvCoreController>(LightvCoreController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(lightvCoreController.getHello()).toBe('Hello World!');
    });
  });
});
