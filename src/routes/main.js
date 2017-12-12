import koaRouter from "koa-joi-router";

const router = koaRouter();

async function ctrl(ctx) {
  ctx.body = "Hello World!";
}

const routes = [
  {
    method: "get",
    path: "/",
    handler: ctrl,
    meta: {
      swagger: {
        summary: "Displays Hello World"
      }
    }
  }
];

router.route(routes);
export default router;
