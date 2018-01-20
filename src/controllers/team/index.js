export async function getInfo(ctx) {
  ctx.body = ctx.state.contest.toJSON();
}

export async function getInvites(ctx) {
  ctx.body = "Get invites";
}

export async function createTeam(ctx) {
  ctx.body = "Create team";
}

export async function inviteMember(ctx) {
  ctx.body = "Invite member";
}

export async function acceptInvite(ctx) {
  ctx.body = "Accept invite";
}
