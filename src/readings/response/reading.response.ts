import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ReadingModel } from '../models/reading.model';

@ObjectType()
export class ReadingResponse {
  constructor(readings: ReadingModel[], totalCount: number) {
    this.list = readings;
    this.totalCount = totalCount;
  }

  @Field((type) => Int)
  totalCount: number;

  @Field((type) => [ReadingModel])
  list: ReadingModel[];
}
