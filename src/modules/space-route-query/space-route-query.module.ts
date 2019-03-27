import { Module } from '@nestjs/common';

import { SpaceRouteQueryService } from './space-route-query.service';
export { SpaceRouteQueryService } from './space-route-query.service';

export { SpaceRouteQuery } from './space-route-query.entity';

import { ConfigModule } from '@modules/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpaceRouteQueryRepository } from './space-route-query.repository';

@Module({
    imports: [
        ConfigModule,
        TypeOrmModule.forFeature([SpaceRouteQueryRepository])
    ],
    providers: [
        SpaceRouteQueryService
    ]
})
export class SpaceRouteQueryModule {}
