import { Test, TestingModule } from '@nestjs/testing';
import { TaxonomyTagService } from './taxonomy-tag.service';

describe('TaxonomyTagService', () => {
  let service: TaxonomyTagService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaxonomyTagService],
    }).compile();

    service = module.get<TaxonomyTagService>(TaxonomyTagService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
