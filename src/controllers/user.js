export async function get(ctx) {
  ctx.body = ctx.state.user.toJSON();
  ctx.body.info = ctx.state.userinfo;
}
