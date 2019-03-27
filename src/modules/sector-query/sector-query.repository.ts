import _ from 'lodash';
import { EntityRepository, Repository } from 'typeorm';

import { PaginationParams } from '@modules/common/pagination';

import { SectorQuery } from './sector-query.entity';

@EntityRepository(SectorQuery)
export class SectorQueryRepo extends Repository<SectorQuery> {

    async getQueriesFromSpaceship(spaceshipId: number, {offset, limit}: PaginationParams) {
        return this.findAndCount({
            where: { spaceshipId },
            skip: offset,
            take: limit
        });
    }

    async getLastQueries({offset, limit}: PaginationParams): Promise<
        [Pick<SectorQuery, 'sector' | 'spaceshipId'>[], number]
    > {
        return this
            .createQueryBuilder('srq')
            .select('srq.spaceshipId')
            .addSelect('srq.sector')
            .addSelect('MAX(sqr.id)')
            .groupBy('spaceshipId')
            .skip(offset)
            .take(limit)
            .select('srq.spaceshipId')
            .addSelect('srq.sector')
            .printSql()
            .getManyAndCount();
    }
}
