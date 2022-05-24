import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { PrismaService } from './prisma.service';
import { PrismaModel } from './_gen/entities';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:3000', 'https://scouts-talentpool.netlify.app'],
    credentials: true,
  });

  const prismaService: PrismaService = app.get(PrismaService);
  prismaService.enableShutdownHooks(app);

  const config = new DocumentBuilder()
    .setTitle('Talentpool API')
    .setDescription('Backend für die ICT Scouts Talentpool Web App.')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    extraModels: [...PrismaModel.extraModels],
  });
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {},
  });

  await app.listen(process.env.PORT || 2030);
}
bootstrap();
