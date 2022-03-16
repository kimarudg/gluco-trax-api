import { validateInput } from '@core/validators';
import { ReadingModel } from '@app/readings/models/reading.model';
import { UserModel } from '@core/modules/user/models/user.model';
import { SearchTerms } from './../../../core/validators/search-terms';
import { ReadingRepository } from '@app/readings/repository/reading.repository';
import { TYPES } from '@app/types';
import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { EntityManager, getConnection } from 'typeorm';
import { ReadingInput } from '@app/readings/validators/reading.input';
import { TaxonomyTagModel } from '@app/taxonomy/models/taxonomy-tags.model';

@Injectable()
export class ReadingsService {
  public readonly repository: ReadingRepository;
  private readonly logger = new Logger(ReadingsService.name);

  async getPaginatedReadings(
    skip?: number,
    take?: number,
    searchTerm?: SearchTerms,
  ) {
    return this.repository.getPaginatedReadings(skip, take, searchTerm);
  }

  async createReading(
    reading: ReadingInput,
    creator: UserModel,
  ): Promise<ReadingModel> {
    const { userId, value, typeId, dateCreated } = reading;

    const user = await this.manager
      .findOneOrFail(UserModel, userId)
      .catch(() => {
        throw new NotFoundException(`User with id: ${userId} not found!`);
      });

    const readingType = await this.manager
      .findOneOrFail(TaxonomyTagModel, typeId)
      .catch(() => {
        throw new NotFoundException(
          `Reading Type with id: ${typeId} not found!`,
        );
      });
    const readingToSave = Object.assign(new ReadingModel(), {
      user,
      value,
      type: readingType,
      creator,
      dateCreated,
    });
    await validateInput(readingToSave);

    return this.repository.save(readingToSave);
  }

  constructor(
    @Inject(TYPES.EntityManager) public readonly manager: EntityManager,
  ) {
    this.repository = manager.getCustomRepository(ReadingRepository);
  }
}
