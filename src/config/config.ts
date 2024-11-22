  /**
   * NOTE :
   * THIS PAGE CONTAIN ALL THE CODE RELATED TO DATABASE CONNECTION.
   */

  // Import dotenv library so we can access env file information.
  import dotenv from "dotenv";

  // Dynamically load the appropriate .env file
// const envFile = process.env.NODE_ENV === "development" ? ".env.development" : ".env.local";
dotenv.config({ path: '.env.development'});

  // Store sensitive information from env file to this file which we can use in project.
  const POSTGRESS_USERNAME = process.env.POSTGRESS_USERNAME || "";
  const POSTGRESS_PASSWORD = process.env.POSTGRESS_PASSWORD || "";
  const POSTGRESS_DB = process.env.POSTGRESS_DB || "";
  const POSTGRESS_HOST = process.env.POSTGRESS_HOST || "127.0.0.1";
  const POSTGRESS_DIALLCT = process.env.POSTGRESS_DIALLCT || "postgres";
  const POSTGRESS_ENV = process.env.POSTGRESS_ENV || "development";
  const POSTGRESS_URL = `POSTGRESSdb://${POSTGRESS_USERNAME}:${POSTGRESS_PASSWORD}@localhost:27017/?authMechanism=DEFAULT&authSource=${POSTGRESS_DB}`;
  const POSTGRESS_PORT = process.env.POSTGRESS_PORT
    ? Number(process.env.POSTGRESS_PORT)
    : 1337;
  const Server_PORT = process.env.Server_PORT
    ? Number(process.env.Server_PORT)
    : 1337;

  // Export only neccessary information which will be used in project
  export const config = {
    POSTGRESS: {
      url: POSTGRESS_URL,
    },
    server: {
      port: Server_PORT,
    },
    Development: {
      username: POSTGRESS_USERNAME,
      password: POSTGRESS_PASSWORD,
      database: POSTGRESS_DB,
      host: POSTGRESS_HOST,
      dialect: POSTGRESS_DIALLCT,
      port: POSTGRESS_PORT,
      env: POSTGRESS_ENV,
    },
  };
