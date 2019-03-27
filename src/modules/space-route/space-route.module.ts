import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigModule } from '@modules/config';

import { SpaceRouteRepository } from './space-route.repository';
import { SpaceRouteService } from './space-route.service';
import { SpaceRoute } from './space-route.entity';


const services = [
    SpaceRouteService
];

@Module({
    imports: [
        TypeOrmModule.forFeature([
            SpaceRoute,
            SpaceRouteRepository
        ]),
        ConfigModule
    ],
    providers: services,
    exports:   services
})
export class SpaceRouteModule {}
