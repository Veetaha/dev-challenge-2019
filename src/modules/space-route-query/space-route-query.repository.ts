import _ from 'lodash';
import * as I from '@app/interfaces';
import { validateOrReject } from 'class-validator';
import { EntityRepository, AbstractRepository } from "typeorm";

import { SpaceRouteQuery } from "./space-route-query.entity";
import { SpaceRoute } from '@modules/space-route';

export interface CreateData {
    spaceshipId: number;
    sector:      number;
    spaceRoutes: SpaceRoute[];
}

@EntityRepository(SpaceRouteQuery)
export class SpaceRouteQueryRepository extends AbstractRepository<SpaceRouteQuery> {


    async create(data: CreateData) {
        const query = _.merge(new SpaceRouteQuery, data);
        await validateOrReject(query);
        await super.repository.save(query);
    }

    async getSpaceshipQueries(spaceshipId: number, {offset, limit}: I.PaginationParams) {        
        return super.repository.find({
            where: { spaceshipId },
            skip: offset,
            take: limit
        });
    }

    async getLastQueries(
        {offset, limit}: I.PaginationParams
    ): Promise<Pick<SpaceRouteQuery, 'sector' | 'spaceshipId'>[]> {
        return super.repository
            .createQueryBuilder('srq')
            .select('srq.spaceshipId')
            .addSelect('srq.sector')
            .addSelect('MAX(sqr.id)')
            .groupBy('spaceshipId')
            .skip(offset)
            .take(limit)
            .select('srq.spaceshipId')
            .addSelect('req.sector')
            .printSql()
            .getMany();
    }
}
