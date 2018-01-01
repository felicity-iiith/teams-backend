import Sequelize from "sequelize";

const sequelize = new Sequelize(config.get("dburi"));

export async function dbconnect() {
  try {
    await sequelize.authenticate();
    // eslint-disable-next-line
    console.log("Connection has been established successfully.");
  } catch (err) {
    // eslint-disable-next-line
    console.error("Unable to connect to the database:", err);
    // Keep retrying till successful
    await dbconnect();
  }
}

export default sequelize;
