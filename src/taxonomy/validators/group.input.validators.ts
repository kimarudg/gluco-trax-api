import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { GraphQLJSONObject } from 'graphql-type-json';
import { Field, InputType } from '@nestjs/graphql';
import { AsEither } from '@core/validators';

@InputType()
export class GroupInput {
  @Field(() => String, { nullable: true })
  @IsUUID('4')
  @IsOptional(AsEither)
  id?: string;

  @Field(() => String)
  @IsString(AsEither)
  name: string;

  @Field(() => GraphQLJSONObject)
  @IsNotEmpty({ ...AsEither, each: true })
  tagIds: { [id: string]: string }[];
}
