import express from "express";
import http from "http";
import cors from "cors";
import compression from "compression";
import { config } from "./config/config";
import Logging from "./middleware/Logging";
import { routerV1, routerV2 } from "./routes/Index";
import { jwtVerify } from "./middleware/Auth";
import favicon from 'serve-favicon';
import cookieParser from "cookie-parser";
import { ormProject } from "./sequelize"; // Import Sequelize instance from your database file
import path from "path";

// Temp
const app = express();

var corsOptions = {
  origin: "http://localhost:5173"
};

// const corsOptions = {
//   origin: [
//     "http://localhost:5173", // Allow local development
//     "http://185.239.208.33:5173", // Allow requests from front-end hosted on the server
//   ],
//   credentials: true, // If using cookies or other credentials
// };


app.use(cors(corsOptions));
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


const StartServer = () => {
  app.use((req, res, next) => {
    Logging.info(
      `Incoming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`
    );
    res.on("finish", () => {
      if (res.statusCode == 200 || res.statusCode == 201) {
        Logging.info(
          `Result - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`
        );
      } else {
        Logging.error(
          `Result - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`
        );
      }
    });
    next();
  });

  
  


  app.use("/ping", (req, res, next) =>
    res.status(200).json({ message: "Working" })
  );



  app.use("/google", (req, res, next) =>
    res.send('<a href="/auth/google">Authenticate with Google</a>')
  );
  app.use("/protected", (req, res, next) =>
    res.send('<h2>Protected Route</h2>')
  );

  app.use("/api/v1", routerV2);
  app.use(jwtVerify);
  app.use("/api/v1", routerV1);


  http
    .createServer(app)
    .listen(config.server.port, () =>
      Logging.info(`Server is running on Port ${config.server.port}.`)
    );
};

// Check database connection
ormProject
  .authenticate()
  .then(() => {
    Logging.info("Database connected successfully.");
    StartServer();
  })
  .catch((error: any) => {
    Logging.error(`Unable to connect to the database: ${error}`);
  });

export default app;
