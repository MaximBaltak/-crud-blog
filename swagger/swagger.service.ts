import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export function configureSwagger(app: any) {
  const config = new DocumentBuilder()
    .setTitle("Blog API")
    .setDescription('API для веб-сервера "Блог"')
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);
}
