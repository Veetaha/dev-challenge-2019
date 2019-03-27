import _ from 'lodash';
import { EntityRepository, Repository } from 'typeorm';

import { PaginationParams } from '@modules/common/pagination';

import { SectorQuery } from './sector-query.entity';

@EntityRepository(SectorQuery)
export class SectorQueryRepo extends Repository<SectorQuery> {

    async getQueriesFromSpaceship(spaceshipId: number, {offset, limit}: PaginationParams) {
        return this
            .createQueryBuilder('sq')
            .where('sq.spaceshipId = :spaceshipId', { spaceshipId })
            .offset(offset)
            .limit(limit)
            .getManyAndCount();
    }

    async getLastQueries({offset, limit}: PaginationParams): Promise<
        [Pick<SectorQuery, 'sector' | 'spaceshipId'>[], number]
    > {
        return this
            .createQueryBuilder('sq')
            .select('sq.spaceshipId', 'sid')
            .addSelect('sq.sector', 'sector')
            .addSelect('MAX(sq.id)', 'id')
            .groupBy('sid')
            .addGroupBy('sector')
            .addGroupBy('id')
            .offset(offset)
            .limit(limit)
            .getManyAndCount();
    }
}
