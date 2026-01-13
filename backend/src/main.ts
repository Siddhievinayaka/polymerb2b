import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // ⚡ Enable CORS for your frontend
  app.enableCors({
    origin: 'https://polymertrader.onrender.com', // allow only your frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true, // if you send cookies or auth headers
  });
  app.useGlobalPipes(new ValidationPipe())

  const config = new DocumentBuilder()
    .setTitle('Polymer Trading API')
    .setDescription('B2B Polymer Trading Platform API')
    .setVersion('1.0')
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  const port = process.env.PORT || 3002
  await app.listen(port, '0.0.0.0')

  console.log(`Backend running on port ${port}`)
}
bootstrap()
