export async function get(ctx) {
  ctx.body = ctx.state.user;
  ctx.body.info = ctx.state.userinfo;
}
