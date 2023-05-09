import { Test, TestingModule } from '@nestjs/testing';
import { Guesses } from './guesses';

describe('GuessesController', () => {
  let controller: Guesses;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Guesses],
    }).compile();

    controller = module.get<Guesses>(Guesses);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
