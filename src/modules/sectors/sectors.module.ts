import { Module } from '@nestjs/common';

import { SpaceRouteModule } from '@modules/space-route';
import { SectorQueryModule } from '@modules/sector-query';

import { SectorsController } from './sectors.controller';


@Module({
    imports: [
        SpaceRouteModule,
        SectorQueryModule
    ],
    controllers: [SectorsController]
})
export class SectorsModule {}
