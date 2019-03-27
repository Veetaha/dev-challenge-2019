import * as Vts from 'vee-type-safe';
import { Controller, Get, Param } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';

import { Pagination, PaginationParams, ApiPaginationImplicitQuery } from '@modules/common/pagination';
import { SectorQueryService } from '@modules/sector-query';
import { ParseNumberPipe } from '@modules/common/parse-number';


@Controller('api/v1/control-center')
export class ControlCenterController {

    constructor(
        private readonly sectorQueries: SectorQueryService
    ) {}

    @ApiPaginationImplicitQuery
    @ApiOkResponse({
        description: 'Returns paginated array of spaceships with their last route queries',
    })
    @Get('/spaceships/:id/route-queries') 
    async getQueriesFromSpaceship(
        @Param('id', new ParseNumberPipe(Vts.isPositiveInteger)) 
        spaceshipId: number,
        @Pagination() 
        pageParams: PaginationParams
    ) {
        return this.sectorQueries.getQueriesFromSpaceship(
            spaceshipId, pageParams
        );
    }

    @ApiPaginationImplicitQuery
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
