import { IsOptional, IsString, IsUUID } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';
import { AsEither } from '@core/validators';
@InputType()
export class TaxonomyInput {
  @Field((name) => String, { nullable: true })
  @IsOptional(AsEither)
  @IsUUID('4')
  id?: string;

  @Field((name) => String)
  @IsString(AsEither)
  name: string;
}
