import { Field, Int, ObjectType } from '@nestjs/graphql';
import { TaxonomyModel } from '../models/taxonomy.model';

@ObjectType()
export class TaxonomyResponse {
  constructor(taxonomies: TaxonomyModel[], totalCount: number) {
    this.list = taxonomies;
    this.totalCount = totalCount;
  }

  @Field((type) => Int)
  totalCount: number;

  @Field((type) => [TaxonomyModel])
  list: TaxonomyModel[];
}
