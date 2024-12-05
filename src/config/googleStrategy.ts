import passport from "passport";
import { Strategy as GoogleStrategy, VerifyCallback } from "passport-google-oauth2";

import { ProjectDB } from "../sequelize";

const UserAuthenticationFactory = ProjectDB.UserAuthentication;

// Load environment variables
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "";
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || "";
const SERVER_PORT = process.env.Server_PORT || "";

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: `http://localhost:${SERVER_PORT}/auth/google/callback`, // Update to production URL
      passReqToCallback: true,
    },
    async (
      req: any,
      accessToken: string,
      refreshToken: string,
      profile: any,
      done: VerifyCallback
    ) => {
      try {
        // Check if user already exists
        let user = await UserAuthenticationFactory.findOne({
          where: { googleId: profile.email },
        });

        // Create new user if not found
        if (!user) {
          user = await UserAuthenticationFactory.create({
            googleId: profile.email,
            email: profile.email,
            displayName: profile.displayName,
            role_id: 1, // Set default role
          });
        }


        return done(null, { user });
      } catch (err) {
        console.error("Error in Google Strategy:", err);
        return done(err, null);
      }
    }
  )
);

export default passport;
