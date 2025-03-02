import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";

import { addComment, getAllComments } from "../controllers/comment.controller.js";

const router = Router();

router.route("/add-comment/:recipeId").post(verifyJwt, addComment);

router.route("/getAll-comment/:recipeId").get(getAllComments);

export default router;
