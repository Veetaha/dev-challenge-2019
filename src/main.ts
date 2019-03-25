import { NestFactory } from '@nestjs/core';
import { AppModule } from '@modules/app.module';
import { LoggerService } from '@app/modules/utils';


async function bootstrap() {
    const port = 3000;
    const app = await NestFactory.create(AppModule);
    await app.listen(port);
    app.get(LoggerService).info(`🚀  Server is listening on port ${port}`);
}
bootstrap()
    .catch(err => console.error('Bootstrapping error:', err));
