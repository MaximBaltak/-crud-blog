import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { FastifyAdapter } from "@nestjs/platform-fastify";
import { configureSwagger } from "swagger/swagger.service";

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule,
    new FastifyAdapter({ logger: true }),
  );
  configureSwagger(app);
  await app.listen(process.env.PORT ?? 3000, "0.0.0.0");
}
bootstrap()
  .then(() => {
    console.log(
      `Server is running on http://localhost:${process.env.PORT ?? 3000}`,
    );
  })
  .catch((err) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
  });
