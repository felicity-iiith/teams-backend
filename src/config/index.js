import convict from "convict";

// Define a schema
const config = convict({
  env: {
    doc: "The application environment.",
    format: ["production", "development", "test"],
    default: "development",
    env: "NODE_ENV"
  },
  port: {
    doc: "The port to bind.",
    format: "port",
    default: 8080,
    env: "PORT"
  },
  dburi: {
    doc:
      "The URI of the database. http://docs.sequelizejs.com/class/lib/sequelize.js~Sequelize.html#instance-constructor-constructor",
    format: "*",
    default: "sqlite://contest.db",
    env: "DBURI"
  },
  publicApiUrl: {
    doc:
      "The public URL of the API (for redirects to be provided to external APIs)",
    format: "url",
    default: "http://localhost:8080",
    env: "PUBLIC_API_URL"
  },
  publicFrontendUrl: {
    doc: "The public URL of the frontend (for redirects in browser)",
    format: "url",
    default: "http://localhost:3000",
    env: "PUBLIC_FRONTEND_URL"
  }
});

// Perform validation
config.validate({ allowed: "strict" });

export default config;
