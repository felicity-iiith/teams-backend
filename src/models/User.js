import Sequelize from "sequelize";
import db from "./db";

const User = db.define("user", {
  username: {
    type: Sequelize.STRING,
    primaryKey: true
  }
});

export default User;
