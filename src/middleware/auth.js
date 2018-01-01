import User from "../models/User";

// Global middleware function to get username from header set by api gateway
export default async function(ctx, next) {
  let userinfo =
    ctx.header["X-Userinfo"] && JSON.parse(ctx.header["X-Userinfo"]);
  if (!isProd && !userinfo && ctx.header["username"]) {
    userinfo = {
      preferred_username: ctx.header["username"]
    };
  }
  if (userinfo) {
    [ctx.state.user] = await User.findOrCreate({
      where: { username: userinfo.preferred_username }
    });
  }
  ctx.state.userinfo = userinfo;
  ctx.state.isAuthenticated = !!ctx.state.user;
  return next();
}

// Import this middleware and add it as a handler to respond 403 if the user is not authenticated
export async function isAuthenticated(ctx, next) {
  if (!ctx.state.isAuthenticated) {
    ctx.response.status = 403;
    return;
  }
  return next();
}
