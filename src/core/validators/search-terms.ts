import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SearchTerms {
  @Field((type) => String, { nullable: true })
  name?: string;

  @Field((type) => String, { nullable: true })
  id?: string;

  @Field((type) => String, { nullable: true })
  taxonomyId?: string;

  @Field((type) => String, { nullable: true })
  userId?: string;
}
