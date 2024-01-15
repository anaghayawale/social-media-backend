import { Router } from "express";
import { checkJWT } from "../middleware/auth.middleware.js";
import {
  addNewPost,
  deletePost,
  updatePost,
  getAllPosts,
} from "../controllers/post.controller.js";

const router = Router();

// PROTECTED ROUTES
router.route("/addpost").post(checkJWT, addNewPost);
router.route("/updatemypost").put(checkJWT, updatePost);
router.route("/deletemypost").delete(checkJWT, deletePost);
router.route("/getmyposts").get(checkJWT, getAllPosts);

export default router;
