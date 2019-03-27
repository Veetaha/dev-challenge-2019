import { EntityRepository, Repository } from "typeorm";
import { SpaceRoute } from './space-route.entity';

@EntityRepository(SpaceRoute)
export class SpaceRouteRepository extends Repository<SpaceRoute> {
}
