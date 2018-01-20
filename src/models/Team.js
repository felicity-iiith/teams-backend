import Sequelize from "sequelize";
import db from "./db";

import User from "./User";
import Contest from "./Contest";

const Team = db.define("team", {
  teamname: {
    type: Sequelize.STRING
  }
});

Team.belongsTo(Contest);
Team.belongsTo(User);

export default Team;
