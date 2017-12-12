import Koa from "koa";
import cors from "@koa/cors";

import routes from "./routes";

async function setup() {
  const app = new Koa();
  if (!isProd) app.use(cors());
  app.use(routes);
  await app.listen(config.get("port"));
}

setup().then(() => {
  console.log("Server started on port " + config.get("port")); // eslint-disable-line
});
