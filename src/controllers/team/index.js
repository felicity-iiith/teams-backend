import Team from "../../models/Team";
import Invite from "../../models/Invite";

export async function getInfo(ctx) {
  ctx.body = ctx.state.contest.toJSON();
}

export async function getInvites(ctx) {
  ctx.body = "Get invites";
}

export async function createTeam(ctx) {
  const { teamname } = ctx.request.body;
  const { username } = ctx.state.user;
  const contestSlug = ctx.state.contest.slug;
  if (ctx.state.team) {
    ctx.status = 403;
    return;
  }
  if (await Team.findOne({ where: { teamname, contestSlug } })) {
    ctx.status = 409;
    return;
  }
  const team = await Team.create({
    teamname: teamname,
    userUsername: username,
    contestSlug
  });
  await Invite.create({
    userUsername: username,
    teamId: team.id,
    accepted: true,
    invited_by: username
  });
  ctx.body = team;
}

export async function inviteMember(ctx) {
  ctx.body = "Invite member";
}

export async function acceptInvite(ctx) {
  ctx.body = "Accept invite";
}
