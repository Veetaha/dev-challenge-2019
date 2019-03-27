import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UtilsModule   } from '@modules/utils';
import { ConfigModule, ConfigService } from '@modules/config';
import { SpaceRouteModule } from '@modules/space-route';
import { ControlCenterModule } from '@modules/control-center';




@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useExisting: ConfigService
        }),
        UtilsModule,
        ConfigModule,
        ControlCenterModule,
        SpaceRouteModule
    ]
})
export class AppModule {}
