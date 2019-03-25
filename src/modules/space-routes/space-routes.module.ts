import { Module } from '@nestjs/common';

import { SpaceRoutesService } from './space-routes.service';
export { SpaceRoutesService as SpaceGatewayService } from './space-routes.service';

import { ConfigModule } from '@modules/config';

@Module({
    imports: [
        ConfigModule
    ],
    providers: [
        SpaceRoutesService
    ]
})
export class SpaceRoutesModule {}
