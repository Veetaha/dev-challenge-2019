import * as Vts from 'vee-type-safe';
import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';

import { SpaceRouteResponse, SpaceRouteService } from '@modules/space-route';
import { SectorQuery, SectorQueryService } from '@modules/sector-query';
import { ParseNumberPipe } from '@modules/common/parse-number';


@Controller('api/v1/sectors')
export class SectorsController {

    constructor(
        private readonly spaceRoutes:   SpaceRouteService,
        private readonly sectorQueries: SectorQueryService
    ) {}


    @ApiOkResponse({
        type: [SpaceRouteResponse],
        description: 'Returns array of possible routes at different security levels for the given sector',
    })
    @Get(':sector') 
    async getRoutes(
        @Query('spaceshipId', new ParseNumberPipe(Vts.isPositiveInteger)) 
        spaceshipId: number,
        @Param('sector',  new ParseNumberPipe(Vts.isZeroOrPositiveInteger))
        sector: number
    ) {
        const routes = await this.sectorQueries.querySpaceRoutes(new SectorQuery({
            sector, spaceshipId
        }));

        return routes.map(level => new SpaceRouteResponse({
            securityLevel: level.securityLevel,
            gates:         this.spaceRoutes.getPathsForLevel(level)
        }));
    }
}
