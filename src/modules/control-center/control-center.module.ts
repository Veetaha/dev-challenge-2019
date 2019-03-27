import { Module } from '@nestjs/common';
import { ControlCenterController } from './control-center.controller';
import { SectorQueryModule } from '@modules/sector-query';

@Module({
    imports: [
        SectorQueryModule,
    ],
    controllers: [ControlCenterController]
})
export class ControlCenterModule {}
