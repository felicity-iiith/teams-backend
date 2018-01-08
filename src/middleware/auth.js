import User from "../models/User";

const mock_userinfo = {
  id: "b055c3dd-1341-43c7-9668-18bb435c1e31", // random uuid
  email: "user1@gmail.com",
  given_name: "John",
  family_name: "Doe",
  gender: "male",
  username: "user1",
  name: "John Doe",
  preferred_username: "user1"
};

// Global middleware function to get username from header set by api gateway
export default async function(ctx, next) {
  let userinfo =
    ctx.header["x-userinfo"] && JSON.parse(ctx.header["x-userinfo"]);
  if (!isProd && !userinfo) {
    userinfo = {
      ...mock_userinfo,
      username: ctx.header["username"] || mock_userinfo.username,
      preferred_username: ctx.header["username"] || mock_userinfo.username
    };
  }
  if (userinfo) {
    [ctx.state.user] = await User.findOrCreate({
      where: { username: userinfo.username }
    });
  }
  ctx.state.userinfo = userinfo;
  ctx.state.isAuthenticated = !!ctx.state.user; // Always true
  return next();
}
