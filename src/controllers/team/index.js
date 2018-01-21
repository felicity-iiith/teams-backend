import rp from "request-promise-native";
import User from "../../models/User";
import Team from "../../models/Team";
import Invite from "../../models/Invite";

export async function getInfo(ctx) {
  const { contest, team } = ctx.state;
  ctx.body = contest.toJSON();
  ctx.body.webhook_url = undefined;
  ctx.body.webhook_password = undefined;
  ctx.body.team = team && team.toJSON();
  if (team) {
    ctx.body.team.invites = await team.getInvites();
  }
}

export async function getInvites(ctx) {
  const { username } = ctx.state.user;
  ctx.body = await Invite.findAll({
    where: {
      userUsername: username
    },
    include: [
      {
        model: Team,
        where: { contestSlug: ctx.params.contest }
      }
    ]
  });
}

export async function createTeam(ctx) {
  const { teamname } = ctx.request.body;
  const { username } = ctx.state.user;
  const { contest } = ctx.state;
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
  await rp.get({
    method: "get",
    url: `${contest.webhook_url}/${teamname}/${username}`,
    auth: {
      user: "admin",
      pass: contest.webhook_password
    }
  });
  ctx.body = team;
}

export async function inviteMember(ctx) {
  const { contest, user, team } = ctx.state;
  const { uoe } = ctx.params;
  if (!team) {
    ctx.status = 403;
    ctx.body = { error: "You have not created or joined a team" };
    return;
  }
  const inviteCount = await Invite.count({
    where: { teamId: team.id }
  });
  if (inviteCount >= contest.maxTeamSize) {
    ctx.status = 403;
    ctx.body = { error: "You have already invited max number of team members" };
    return;
  }
  const user2 = await User.findOrCreate({ where: { username: uoe } });
  const invite = await Invite.findOrCreate({
    where: {
      teamId: team.id,
      userUsername: user2[0].username,
      invited_by: user.username
    }
  });
  ctx.body = invite[0];
}

export async function acceptInvite(ctx) {
  const { username } = ctx.state.user;
  const { contest } = ctx.state;
  const invite = await Invite.findById(ctx.params.inviteId, {
    include: [Team]
  });
  if (!invite) {
    ctx.status = 404;
    return;
  }
  if (ctx.state.team || invite.userUsername !== username) {
    ctx.status = 403;
    return;
  }
  const teamname = invite.team.teamname;
  await invite.update({ accepted: true });
  await rp.get({
    method: "get",
    url: `${contest.webhook_url}/${teamname}/${username}`,
    auth: {
      user: "admin",
      pass: contest.webhook_password
    }
  });
  ctx.body = invite;
}
