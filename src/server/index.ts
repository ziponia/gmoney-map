require("dotenv").config();
import "reflect-metadata";

import express from "express";
import { useExpressServer } from "routing-controllers";
import next from "next";
import { databaseProvider } from "./database/database.provider";

import ShopController from "./shop/shop.controller";

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const bootstrap = async () => {
  await databaseProvider();
  await app.prepare();
  const server = express();

  useExpressServer(server, {
    controllers: [ShopController],
    classTransformer: false,
  });

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
};

bootstrap();
