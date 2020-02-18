import "./lib/load-env";
import http from "http";
import createApplication from "./app";
import Database from "./lib/database";
import { Express } from "express";
import { isProduction } from "./lib/helpers";

async function bootstrap() {
  try {
    const database = new Database({
      debug: isProduction(process.env.NODE_ENV) ? false : true,
      host: process.env.DB_HOST,
      name: process.env.DB_NAME,
      password:  process.env.DB_PASSWORD,
      port:  Number(process.env.DB_PORT),
      type: process.env.DB_DRIVER,
      user: process.env.DB_USER
    });

    await database.schemaMigration();

    const app: Express = await createApplication({ database: database });
    const server = http.createServer(app);

    server.listen(process.env.PORT);
    console.log(`|> Listening on port ${process.env.PORT}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

bootstrap();
