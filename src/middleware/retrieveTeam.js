import Invite from "../models/Invite";
import Team from "../models/Team";

export default async function(ctx, next) {
  const invite = await Invite.findOne({
    where: {
      userUsername: ctx.state.user.username,
      accepted: true
    },
    include: [
      {
        model: Team,
        where: { contestSlug: ctx.state.contest.slug }
      }
    ]
  });
  ctx.state.team = invite && invite.team;
  return next();
}
