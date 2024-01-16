import { Router } from "express";
import { checkJWT } from "../middleware/auth.middleware.js";
import {
  followUser,
  unfollowUser,
  getAllFollowers,
} from "../controllers/follower.controller.js";

const router = Router();

// PROTECTED ROUTES
router.route("/followUser").post(checkJWT, followUser);
router.route("/unfollowUser").delete(checkJWT, unfollowUser);
router.route("/getAllFollowers").get(checkJWT, getAllFollowers);

export default router;
