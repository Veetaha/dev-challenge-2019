import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from '@modules/app.module';
import { LoggerService } from '@modules/utils';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
    const port = 3000;
    const app = (await NestFactory.create(AppModule))
        .useGlobalPipes(new ValidationPipe({ transform: true }));

    const docOpts = new DocumentBuilder()
        .setTitle('Star gateway')
        .setDescription(
        `${"The control center accumulates information about functioning ally gates, "
        }${"and security level for space routes."
        }${"Any spaceship can query possible path to particular galaxy sector."
        }${"Control center can retreive information about latest starship's query or "
        }${"the list of spaceships"
        }`)
        .setVersion('1.0')
        .addTag('space')
        .addTag('routing')
        .build();
        
    SwaggerModule.setup('api/swagger', app, SwaggerModule.createDocument(app, docOpts));

    await app.listen(port);
    app.get(LoggerService).info(`🚀  Server is listening on port ${port}`);
}
bootstrap()
    .catch(err => console.error('Bootstrapping error:', err));
