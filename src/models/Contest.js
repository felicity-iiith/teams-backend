import Sequelize from "sequelize";
import db from "./db";

const Contest = db.define("contest", {
  slug: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  maxTeamSize: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 3
  },
  name: Sequelize.STRING,
  public_url: Sequelize.STRING
});

export default Contest;
