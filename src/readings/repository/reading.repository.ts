import { ReadingModel } from '@app/readings/models/reading.model';
import { SearchTerms } from '@core/validators/search-terms';
import { EntityRepository, getRepository, Repository } from 'typeorm';

@EntityRepository(ReadingModel)
export class ReadingRepository extends Repository<ReadingModel> {
  findById(id: string) {
    return this.findOne({ id }, { relations: ['taxonomy'] });
  }

  async getPaginatedReadings(
    skip?: number,
    take?: number,
    searchTerm: SearchTerms = null,
  ) {
    const query = getRepository(ReadingModel)
      .createQueryBuilder('reading')
      .innerJoinAndSelect('reading.user', 'user')
      .innerJoinAndSelect('reading.type', 'type')
      .orderBy('reading.dateCreated', 'DESC')
      .where('reading.type is not null');

    if (skip) query.skip(skip);
    if (take) query.take(take);

    if (searchTerm && searchTerm.name) {
      query.andWhere('LOWER(type.name) like LOWER(:name)', {
        name: `%${searchTerm.name}%`,
      });
    }

    if (searchTerm && searchTerm.id) {
      query.andWhere('LOWER(reading.id::varchar) like LOWER(:id)', {
        id: `%${searchTerm.id}%`,
      });
    }

    if (searchTerm && searchTerm.userId) {
      query.andWhere('LOWER(reading.user_id::varchar) like LOWER(:id)', {
        id: `%${searchTerm.userId}%`,
      });
    }
    const res = await query.getManyAndCount();
    const [list, count] = res;
    return query.getManyAndCount();
  }
}
