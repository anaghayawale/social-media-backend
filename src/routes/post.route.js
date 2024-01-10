import { Router } from "express";
import { checkJWT } from "../middleware/auth.middleware.js";
import { addNewPost } from "../controllers/post.controller.js";

const router = Router();

// POST
router.route("/addpost").post(checkJWT, addNewPost);

export default router;
