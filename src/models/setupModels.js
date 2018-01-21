import db from "./db";
import User from "./User";
import Contest from "./Contest";

export default async function setupModels() {
  // If production then dont alter tables, but fail if table exists
  await db.sync({ force: !isProd });

  // If production then dont create mock models
  if (isProd) return;
  await User.create({
    username: "user1"
  });

  await Contest.create({
    slug: "sample",
    name: "Sample",
    public_url: "http://localhost:3000",
    webhook_url: "http://localhost:8080/teams",
    webhook_password: "password"
  });
}
