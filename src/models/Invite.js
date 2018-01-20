import Sequelize from "sequelize";
import db from "./db";

import Team from "./Team";
import User from "./User";

const Invite = db.define("invite", {
  accepted: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  invited_by: {
    type: Sequelize.STRING
  }
});

Invite.belongsTo(Team);
Invite.belongsTo(User);

export default Invite;
