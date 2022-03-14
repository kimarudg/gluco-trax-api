import { Field, Int, ObjectType } from '@nestjs/graphql';
import { TaxonomyTagModel } from '../models/taxonomy-tags.model';

@ObjectType()
export class TagsResponse {
  constructor(tags: TaxonomyTagModel[], totalCount: number) {
    this.list = tags;
    this.totalCount = totalCount;
  }

  @Field((type) => Int)
  totalCount: number;

  @Field((type) => [TaxonomyTagModel])
  list: TaxonomyTagModel[];
}
