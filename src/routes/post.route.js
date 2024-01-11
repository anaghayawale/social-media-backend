import { Router } from "express";
import { checkJWT } from "../middleware/auth.middleware.js";
import {
  addNewPost,
  deletePost,
  updatePost,
} from "../controllers/post.controller.js";

const router = Router();

// POST
router.route("/addpost").post(checkJWT, addNewPost);
router.route("/updatepost").put(checkJWT, updatePost);
router.route("/deletepost").delete(checkJWT, deletePost);

export default router;
