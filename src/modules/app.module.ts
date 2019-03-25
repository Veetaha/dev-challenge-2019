import { Module } from '@nestjs/common';
import { UtilsModule   } from '@modules/utils';
import { ConfigModule  } from '@modules/config';
import { SpaceRoutesModule } from '@modules/space-routes';


@Module({
    imports: [
        UtilsModule,
        ConfigModule,
        SpaceRoutesModule
    ]
})
export class AppModule {}
