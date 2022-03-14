import { Module } from '@nestjs/common';
import { TaxonomyResolver } from './resolvers/taxonomy/taxonomy.resolver';
import { TaxonomyTagService } from './services/taxonomy-tag/taxonomy-tag.service';
import { TaxonomyService } from './services/taxonomy/taxonomy.service';

@Module({
  providers: [TaxonomyService, TaxonomyTagService, TaxonomyResolver],
})
export class TaxonomyModule {}
