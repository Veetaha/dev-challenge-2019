import { Module } from '@nestjs/common';

import { UtilsModule } from '@modules/utils';

import { ConfigService } from './config.service';
import { SpaceGatesService } from './space-gates.service';

export { ConfigService } from './config.service';
export { SpaceGatesService } from './space-gates.service';

const services = [
    ConfigService, 
    SpaceGatesService
];

@Module({
    imports:   [UtilsModule],
    providers: services,
    exports:   services
})
export class ConfigModule {}
