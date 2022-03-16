import { Module } from '@nestjs/common';
import { ReadingResolver } from './resolvers/reading.resolver';
import { ReadingsService } from './services/readings/readings.service';

@Module({
  providers: [ReadingsService, ReadingResolver],
})
export class ReadingsModule {}
