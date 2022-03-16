import { GqlAuthGuard } from '@app/core/modules/user/guards/gql-auth.guard';
import { SearchTerms } from '@app/core/validators';
import { ReadingModel } from '@app/readings/models/reading.model';
import { UseGuards } from '@nestjs/common';
import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ReadingResponse } from '../response/reading.response';
import { ReadingInput } from '../validators/reading.input';
import { ReadingsService } from './../services/readings/readings.service';

@Resolver(ReadingModel)
@UseGuards(GqlAuthGuard)
export class ReadingResolver {
  constructor(private readingService: ReadingsService) {}
  @Query(() => ReadingResponse)
  async readings(
    @Context('req') request: any,
    @Args({ name: 'skip', type: () => Int, nullable: true }) skip = 0,
    @Args({ name: 'take', type: () => Int, nullable: true }) take = 50,
    @Args({ name: 'searchTerm', type: () => SearchTerms, nullable: true })
    searchTerm: SearchTerms,
  ): Promise<ReadingResponse> {
    const user = request.user;
    const [list, count] = await this.readingService.getPaginatedReadings(
      skip,
      take,
      searchTerm,
    );
    return new ReadingResponse(list, count);
  }

  @Mutation(() => ReadingModel)
  async createReading(
    @Context('req') request: any,
    @Args({ name: 'reading', type: () => ReadingInput, nullable: false })
    reading: ReadingInput,
  ) {
    const user = request.user;
    return this.readingService.createReading(reading, user);
  }
}
