import koaRouter from "koa-joi-router";

const router = koaRouter();

async function ctrl(ctx) {
  if (ctx.state.isAuthenticated) ctx.body = `Hello ${ctx.state.user.username}!`;
  else ctx.body = `Hello World!`;
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
