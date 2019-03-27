import { Module } from '@nestjs/common';
import { SpaceRouteService } from './space-route.service';

export { SpaceRoute } from './space-route.entity';

@Module({
  providers: [SpaceRouteService]
})
export class SpaceRouteModule {}
