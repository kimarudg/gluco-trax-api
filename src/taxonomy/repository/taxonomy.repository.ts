import { EntityRepository, getRepository, Repository } from 'typeorm';
import { TaxonomyModel } from '../models/taxonomy.model';
import { SearchArgs } from '../validators/search-terms';

@EntityRepository(TaxonomyModel)
export class TaxonomyRepository extends Repository<TaxonomyModel> {
  findById(id: string) {
    return this.findOne({ id });
  }

  async getPaginatedTaxonomies(skip, take, searchTerm: SearchArgs = null) {
    const query = getRepository(TaxonomyModel)
      .createQueryBuilder('taxonomy')
      .leftJoinAndSelect('taxonomy.tags', 'tags')
      .skip(skip)
      .take(take)
      .orderBy('taxonomy.dateCreated', 'DESC')
      .where('taxonomy.id is not null');

    if (searchTerm && searchTerm.name) {
      query.andWhere('LOWER(taxonomy.name) like LOWER(:name)', {
        name: `%${searchTerm.name}%`,
      });
    }

    if (searchTerm && searchTerm.id) {
      query.andWhere('LOWER(taxonomy.id::varchar) like LOWER(:id)', {
        id: `%${searchTerm.id}%`,
      });
    }
    return query.getManyAndCount();
  }
}
