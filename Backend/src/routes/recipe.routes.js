import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import {
  createRecipe,
  getAllRecipe,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
} from "../controllers/recipe.controller.js";

const router = Router();

router.route("/create-Recipe").post(
  upload.fields([
    {
      name: "recipeImage",
      maxCount: 1,
    },
  ]),
  verifyJwt,
  createRecipe
);

router.route("/getall-Recipe").get(verifyJwt, getAllRecipe);

router.route("/get-RecipeById/:recipeId").get(getRecipeById);

router.route("/update-Recipe/:recipeId").post(updateRecipe);

router.route("/delete-Recipe/:recipeId").delete(verifyJwt, deleteRecipe);

export default router;
