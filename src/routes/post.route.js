import { Router } from "express";
import { checkJWT } from "../middleware/auth.middleware.js";
import {
  addNewPost,
  deletePost,
  updatePost,
  getAllPosts,
} from "../controllers/post.controller.js";

const router = Router();

// POST
router.route("/addpost").post(checkJWT, addNewPost);
router.route("/updatepost").put(checkJWT, updatePost);
router.route("/deletepost").delete(checkJWT, deletePost);
router.route("/getposts").get(checkJWT, getAllPosts);

export default router;
