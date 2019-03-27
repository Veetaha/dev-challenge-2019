import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';

import { Pagination, PaginationParams } from '@modules/common/pagination';
import { SectorQuery, SectorQueryService } from '@modules/sector-query';
import { InjectRepository } from '@nestjs/typeorm';

@Controller('control-center')
export class ControlCenterController {

    constructor(
        @InjectRepository(SectorQuery)
        private readonly sectorQueries: SectorQueryService
    ) {}

    @ApiOkResponse({
        description: 'Returns paginated array of spaceships with their last route queries',
    })
    @Get('/spaceships/:id/route-queries') 
    async getQueriesFromSpaceship(
        @Param('id', ParseIntPipe) spaceshipId: number,
        @Pagination() pageParams: PaginationParams
    ) {
        return this.sectorQueries.getQueriesFromSpaceship(
            spaceshipId, pageParams
        );
    }


    @ApiOkResponse({
        description: 'Returns paginated array of spaceships with their last route queries',
    })
    @Get('/spaceships/route-queries') 
    async getSpaceshipsQueries(
        @Pagination() pageParams: PaginationParams
    ) {
        return this.sectorQueries.getLastQueries(pageParams);   
    }
}
