import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';
import { AsEither } from '@core/validators';
@InputType()
export class TagInput {
  @Field((name) => String, { nullable: true })
  @IsOptional(AsEither)
  @IsUUID('4')
  id?: string;

  @Field((name) => String)
  @IsString(AsEither)
  name: string;

  @Field((type) => String, { nullable: false })
  @IsNotEmpty(AsEither)
  @IsUUID('4')
  taxonomyId: string;
}
