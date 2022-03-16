// import { UserModule } from '@core/modules/user/user.module';
import { config } from '@app/config';
import { HelmetMiddleware } from '@nest-middlewares/helmet';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import { GqlAuthGuard } from './core/modules/user/guards/gql-auth.guard';
import { ReadingsModule } from './readings/readings.module';
import { TaxonomyModule } from './taxonomy/taxonomy.module';

@Module({
  imports: [
    CoreModule,
    GraphQLModule.forRoot({
      debug: config.isDevelopment,
      playground: true,
      autoSchemaFile: './schema.gql',
      include: [CoreModule, TaxonomyModule, ReadingsModule],
      context: ({ req }) => ({ req }),
      introspection: true,
    }),
    TaxonomyModule,
    ReadingsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: GqlAuthGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    HelmetMiddleware.configure({
      dnsPrefetchControl: false,
      frameguard: true,
      hidePoweredBy: true,
    });
    consumer
      .apply(HelmetMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
