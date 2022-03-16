import { AsEither } from '@core/validators';
import { Field, InputType } from '@nestjs/graphql';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
@InputType()
export class ReadingInput {
  @Field((name) => String, { nullable: true })
  @IsOptional(AsEither)
  @IsUUID('4')
  id?: string;

  @Field((type) => String, { nullable: false })
  @IsNotEmpty(AsEither)
  @IsUUID('4')
  userId: string;

  @Field((type) => Number, { nullable: false })
  @IsNotEmpty(AsEither)
  @IsNumber()
  value: string;

  @Field((type) => String, { nullable: false })
  @IsNotEmpty(AsEither)
  @IsUUID('4')
  typeId: string;

  @Field((type) => Date, { nullable: true })
  @IsOptional()
  @IsDate()
  @IsNotEmpty()
  dateCreated?: Date;
}
