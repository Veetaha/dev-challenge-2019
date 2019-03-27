import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigModule } from '@modules/config';
import { SpaceRouteModule } from '@modules/space-route';
import { PaginationModule } from '@modules/common/pagination';

import { SectorQueryRepo } from './sector-query.repository';
import { SectorQuery } from './sector-query.entity';
import { SectorQueryService } from './sector-query.service';



@Module({
    imports: [
        TypeOrmModule.forFeature([
            SectorQuery,
            SectorQueryRepo
        ]),
        ConfigModule,
        SpaceRouteModule,
        PaginationModule
    ],
    providers: [SectorQueryService],
    exports:   [SectorQueryService]
})
export class SectorQueryModule {}
