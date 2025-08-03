import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";

@Injectable()
export class DatabaseService {
  async configureDatabase(): Promise<void> {
    const config = new DataSource({
      type: "postgres",
      host: process.env.DATABASE_HOST,
      port: parseInt(String(process.env.DATABASE_PORT), 10),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [__dirname + "/../**/*.entity{.js,.ts}"],
      synchronize: true,
    });
    await config.initialize();
  }
}
