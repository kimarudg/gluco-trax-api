import { EntityRepository, getRepository, Repository } from 'typeorm';
import { TaxonomyTagModel } from '../models/taxonomy-tags.model';
import { SearchArgs } from '../validators/search-terms';

@EntityRepository(TaxonomyTagModel)
export class TaxonomyTagRepository extends Repository<TaxonomyTagModel> {
  findById(id: string) {
    return this.findOne({ id }, { relations: ['taxonomy'] });
  }

  async getPaginatedTags(skip, take, searchTerm: SearchArgs = null) {
    const query = getRepository(TaxonomyTagModel)
      .createQueryBuilder('tag')
      .innerJoinAndSelect('tag.taxonomy', 'taxonomy')
      .skip(skip)
      .take(take)
      .orderBy('tag.dateCreated', 'DESC')
      .where('tag.taxonomy_id is not null');

    if (searchTerm && searchTerm.name) {
      query.andWhere('LOWER(tag.name) like LOWER(:name)', {
        name: `%${searchTerm.name}%`,
      });
    }

    if (searchTerm && searchTerm.id) {
      query.andWhere('LOWER(tag.id::varchar) like LOWER(:id)', {
        id: `%${searchTerm.id}%`,
      });
    }

    if (searchTerm && searchTerm.taxonomyId) {
      query.andWhere('LOWER(tag.taxonomy_id::varchar) like LOWER(:id)', {
        id: `%${searchTerm.taxonomyId}%`,
      });
    }
    return query.getManyAndCount();
  }
}
