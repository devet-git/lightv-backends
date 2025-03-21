import { Test, TestingModule } from '@nestjs/testing';
import { LightvStudyController } from './lightv-study.controller';
import { LightvStudyService } from './lightv-study.service';

describe('LightvStudyController', () => {
  let lightvStudyController: LightvStudyController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [LightvStudyController],
      providers: [LightvStudyService],
    }).compile();

    lightvStudyController = app.get<LightvStudyController>(
      LightvStudyController,
    );
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(lightvStudyController.getHello()).toBe('Hello World!');
    });
  });
});
