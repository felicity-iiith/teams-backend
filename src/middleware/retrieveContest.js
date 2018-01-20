import Contest from "../models/Contest";

export default async function(ctx, next) {
  ctx.state.contest = await Contest.findOne({
    where: { slug: ctx.params.contest }
  });
  if (!ctx.state.contest) ctx.status = 404;
  else return next();
}
