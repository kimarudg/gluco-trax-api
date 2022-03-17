import { Inject, Injectable, Logger } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { TYPES } from '../../../types';
import { TaxonomyTagRepository } from '../../repository/taxonomy-tag.repository';
import { TaxonomyRepository } from '../../repository/taxonomy.repository';
import { TagInput } from '../../validators/tag.input.validators';
import { TaxonomyInput } from '../../validators/taxonomy.input.validators';

@Injectable()
export class TaxonomyService {
  public readonly repository: TaxonomyRepository;
  public readonly tagsRepository: TaxonomyTagRepository;
  private readonly logger = new Logger(TaxonomyService.name);

  async save(taxonomyData: TaxonomyInput) {
    const { id, name } = taxonomyData;
    const taxonomy = {
      id,
      name,
    };
    const saved = await this.repository.save(taxonomy);
    return this.repository.findById(saved.id);
  }

  async saveTag(tagData: TagInput) {
    const { name, taxonomyId, id } = tagData;
    const tag = {
      id,
      name,
      taxonomy: {
        id: taxonomyId,
      },
    };
    return this.tagsRepository.save(tag);
  }

  constructor(
    @Inject(TYPES.EntityManager) public readonly manager: EntityManager,
  ) {
    this.repository = manager.getCustomRepository(TaxonomyRepository);
    this.tagsRepository = manager.getCustomRepository(TaxonomyTagRepository);
  }
}
