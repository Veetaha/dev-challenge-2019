import { EntityRepository, Repository } from "typeorm";
import { SpaceRoute } from './space-route.entity';

@EntityRepository(SpaceRoute)
export class SpaceRouteRepository extends Repository<SpaceRoute> {

    async findForSector(sector: number) {
        const routes = await this.find({
            where: { sector },
            select: ['securityLevel', 'beginIndex', 'endIndex'],
            order: { securityLevel: 'ASC' }
        });
        return routes.length === 0 ?  
            null                   : // case nothing was found
            this.hasRoutes(routes) ?  
            routes                 :
            [];                      // case no route exists for the given sector
    }

    private hasRoutes(routes: SpaceRoute[]) {
        return routes.length > 1 || !routes[0].isEmpty();
    }
}
