import express from "express";
import { AuthController } from "../../controller/Index"; // Adjust the import path as necessary
import passport from "../../config/googleStrategy";
import { getHandlerResponseObject , httpStatus } from "../../helper/Index"
import jwt from "jsonwebtoken";

const AuthRouter = express.Router();

// Route to initiate Google login
AuthRouter.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Callback route for Google OAuth
AuthRouter.get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: "/google" }),
    async (req, res) => {
      try {
        const { user } = req.user as any;
  
        if (!user) {
          const { code, data, message } = getHandlerResponseObject(
            false,
            httpStatus.UNAUTHORIZED,
            "Google authentication failed",
            null
          );
          return res.status(code).json({ code, data, message });
        }
  
        // Generate access and refresh tokens
        const accessToken = jwt.sign(
          { username: user.email, role: user.role_id },
          process.env.ACCESS_TOKEN_SECRET as string,
          { expiresIn: "20m" }
        );
  
        console.log(jwt.decode(accessToken)); // Log the payload
  
        const refreshToken = jwt.sign(
          { username: user.email, role: user.role_id },
          process.env.REFRESH_TOKEN_SECRET as string,
          { expiresIn: "1h" }
        );
  
        // Save refresh token to the user in the database
        user.refreshToken = refreshToken;
        await user.save();
  
        const { code, data, message } = getHandlerResponseObject(
          true,
          httpStatus.OK,
          "Google sign-in successful",
          accessToken
        );
  
        return res
          .status(code)
          .cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000, // 1 day
          })
          .json({ code, data, message });
      } catch (err) {
        console.error("Error in Google callback:", err);
  
        const { code, data, message } = getHandlerResponseObject(
          false,
          httpStatus.INTERNAL_SERVER_ERROR,
          "An error occurred during Google authentication",
          null
        );
  
        return res.status(code).json({ code, data, message });
      }
    }
  );

// Route to get a single User Profile by ID
AuthRouter.post("/login", AuthController.userLogin);

export { AuthRouter };
