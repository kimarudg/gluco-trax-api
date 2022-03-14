import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveProperty,
  Resolver,
} from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { TaxonomyTagModel } from '../../models/taxonomy-tags.model';
import { TaxonomyModel } from '../../models/taxonomy.model';
import { TagsResponse } from '../../responses/tags.response';
import { TaxonomyResponse } from '../../responses/taxonomy.response';
import { TaxonomyTagService } from '../../services/taxonomy-tag/taxonomy-tag.service';
import { TaxonomyService } from '../../services/taxonomy/taxonomy.service';
import { SearchArgs } from '../../validators/search-terms';
import { TagInput } from '../../validators/tag.input.validators';
import { TaxonomyInput } from '../../validators/taxonomy.input.validators';

@Resolver(TaxonomyModel)
export class TaxonomyResolver {
  constructor(private taxonomyService: TaxonomyService) {}

  @Query((returns) => TaxonomyResponse)
  async taxonomies(
    @Args({ name: 'skip', type: () => Int, nullable: true }) skip = 0,
    @Args({ name: 'take', type: () => Int, nullable: true }) take = 50,
    @Args({ name: 'searchTerm', type: () => SearchArgs, nullable: true })
    searchTerm: SearchArgs,
  ): Promise<TaxonomyResponse> {
    const [list, count] =
      await this.taxonomyService.repository.getPaginatedTaxonomies(
        skip,
        take,
        searchTerm,
      );
    return new TaxonomyResponse(list, count);
  }

  @ResolveProperty('tags', () => TagsResponse)
  async getTags(
    @Parent() taxonomy: TaxonomyModel,
    @Args({ name: 'skip', type: () => Int, nullable: true }) skip = 0,
    @Args({ name: 'take', type: () => Int, nullable: true }) take = 50,
  ) {
    const [tags, count] =
      await this.taxonomyService.tagsRepository.getPaginatedTags(skip, take, {
        taxonomyId: taxonomy.id,
      });
    return new TagsResponse(tags, count);
  }

  @Query(() => TagsResponse)
  async tags(
    @Args({ name: 'skip', type: () => Int, nullable: true }) skip = 0,
    @Args({ name: 'take', type: () => Int, nullable: true }) take = 50,
    @Args({ name: 'searchTerm', type: () => SearchArgs, nullable: true })
    searchTerm: SearchArgs,
  ) {
    const [tags, count] =
      await this.taxonomyService.tagsRepository.getPaginatedTags(
        skip,
        take,
        searchTerm,
      );
    return new TagsResponse(tags, count);
  }

  @Mutation((returns) => TaxonomyModel)
  createTaxonomy(
    @Args({ name: 'taxonomy', type: () => TaxonomyInput, nullable: false })
    taxonomy: TaxonomyInput,
  ): Promise<TaxonomyModel> {
    return this.taxonomyService.save(taxonomy);
  }

  @Mutation((returns) => TaxonomyTagModel)
  createTaxonomyTag(
    @Args({ name: 'tag', type: () => TagInput, nullable: false })
    tag: TagInput,
  ): Promise<TaxonomyModel> {
    return this.taxonomyService.saveTag(tag);
  }
}
