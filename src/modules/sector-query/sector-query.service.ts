import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { SpaceRouteService } from '@modules/space-route';
import { PaginationParams  } from '@modules/common/pagination';
import { PaginationService } from '@modules/common/pagination';
import { SectorQueryRepo } from './sector-query.repository';
import { SectorQuery } from './sector-query.entity';



@Injectable()
export class SectorQueryService {


    constructor(
        @InjectRepository(SectorQueryRepo)
        private readonly repo:        SectorQueryRepo,
        private readonly spaceRoutes: SpaceRouteService,
        private readonly pagination:  PaginationService
    ) {}

    /**
     * Returns a tuple `[SpaceRouteQuery[], number]` where the second element denotes
     * total records for `spaceshipId` and the first element is an array of queries
     * for this page only.
     * 
     * @param spaceshipId Identifier of the spaceship, to get query history for.
     * @param pageParams  Pagination parameters.
     */
    async getQueriesFromSpaceship(spaceshipId: number, pageParams: PaginationParams) {
        return this.pagination.pageTupleToObj(
            await this.repo.getQueriesFromSpaceship(spaceshipId, pageParams)
        );
    }


    /**
     * Returns paginated array of all last queries for all spaseships.
     * 
     * @param pageParams Pagination parameters.
     */
    async getLastQueries(pageParams: PaginationParams) {
        return this.pagination.pageTupleToObj(
            await this.repo.getLastQueries(pageParams)
        );
        
    }

    /**
     * Tries to lazy load space routes from database. If failed, calculates them
     * from file (gates.txt) and writes them to db. Returns calculated routes or
     * existing records from the database.
     * 
     * @param query Query to retrieve space (and save if not exists) routes for.
     */
    async querySpaceRoutes(query: SectorQuery) {
        await this.repo.save(query);
        const routes = await this.spaceRoutes.getFromDb(query.sector);
        return routes != null 
            ? routes 
            : this.spaceRoutes.saveToDb(this.spaceRoutes.getFromFile(
                query.sector
            ));
    }


}
