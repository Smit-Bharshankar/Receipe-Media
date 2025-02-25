import mongoose, { isValidObjectId } from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary, deleteInCloudinary } from "../utils/cloudinary.js";
import { Recipe } from "../models/recipe.models.js";

const createRecipe = asyncHandler(async (req, res) => {
  try {
    const { title, description, ingredients, steps, image, category } = req.body;

    if ([title, ingredients, steps, category].some((field) => field?.trim() === "")) {
      throw new ApiError(400, "Required fields are missing");
    }

    if (!req.files || !req.files.recipeImage) {
      throw new ApiError(400, "Please upload an image");
    }

    //checking for recipe Image
    const recipeImageLocalPath = req.files?.recipeImage[0]?.path;
    if (!recipeImageLocalPath) {
      throw new ApiError(400, "Recipe Image is required");
    }

    const RecipeImageUrl = await uploadOnCloudinary(recipeImageLocalPath);
    if (!RecipeImageUrl) {
      throw new ApiError(500, "Failed to upload thumbnail image to Cloudinary");
    }

    let ingredientsArray;
    try {
      if (Array.isArray(ingredients)) {
        ingredientsArray = ingredients; // Already an array
      } else if (ingredients.startsWith("[") && ingredients.endsWith("]")) {
        ingredientsArray = JSON.parse(ingredients); // JSON format
      } else {
        ingredientsArray = ingredients.split(",").map((item) => item.trim()); // Comma-separated string
      }
    } catch (error) {
      throw new ApiError(400, "Invalid format for ingredients");
    }

    let stepsArray;
    try {
      if (Array.isArray(steps)) {
        stepsArray = steps; // Already an array
      } else if (steps.startsWith("[") && steps.endsWith("]")) {
        stepsArray = JSON.parse(steps); // JSON format
      } else {
        stepsArray = steps.split(",").map((item) => item.trim()); // Comma-separated string
      }
    } catch (error) {
      throw new ApiError(400, "Invalid format for steps");
    }

    const recipe = await Recipe.create({
      title,
      description,
      ingredients: ingredientsArray,
      steps: stepsArray,
      image: RecipeImageUrl.url,
      category,
      userId: req.user?._id,
    });

    if (!recipe) {
      throw new ApiError(500, "Error while saving Recipe");
    }

    return res.status(200).json(new ApiResponse(200, { recipe }, "Recipe uploaded successfully"));
  } catch (error) {
    throw new ApiError(400, "There's some error in create-Recipe :", error);
  }
});

// const getAllRecipe = asyncHandler(async (req, res) => {
//   const {
//     page = 1,
//     limit = 12,
//     query,
//     sortBy = "createdAt",
//     sortType = "desc",
//     userId,
//   } = req.query;

//   const recipes = await Recipe.aggregate(
//     [
//       query
//         ? {
//             $match: {
//               $or: [
//                 { title: { $regex: query, $options: "i" } },
//                 { description: { $regex: query, $options: "i" } },
//               ],
//             },
//           }
//         : null,
//       userId ? { $match: { userId: new mongoose.Types.ObjectId(userId) } } : null, // Ensure userId filtering
//       {
//         $lookup: {
//           from: "User",
//           localField: "userId",
//           foreignField: "_id",
//           as: "createdBy",
//         },
//       },
//       {
//         $unwind: {
//           path: "$createdBy",
//           preserveNullAndEmptyArrays: true,
//         },
//       },
//       {
//         $project: {
//           image: 1,
//           title: 1,
//           description: 1,
//           ingredients: 1,
//           steps: 1,
//           category: 1,
//           createdBy: {
//             username: 1,
//             avatar: 1,
//           },
//         },
//       },
//       {
//         $facet: {
//           metadata: [{ $count: "total" }],
//           data: [
//             { $sort: { [sortBy]: sortType === "asc" ? 1 : -1 } },
//             // { $sort: { createdAt: -1 } },
//             { $skip: (page - 1) * limit },
//             { $limit: limit },
//           ],
//         },
//       },
//     ].filter(Boolean)
//   ); // Removes null stages

//   const metadata = recipes[0]?.metadata[0] || { total: 0 };
//   const RecipeData = recipes[0]?.data || [];

//   return res.status(200).json(
//     new ApiResponse(
//       200,
//       {
//         recipes: RecipeData,
//         totalRecipes: metadata.total,
//         pagelimit: limit,
//       },
//       "Recipes fetched successfully"
//     )
//   );
// });

// const getAllRecipe = asyncHandler(async (req, res) => {
//   try {
//     const { page = 1, limit = 12, query, userId } = req.query;

//     const recipes = await Recipe.aggregate(
//       [
//         query
//           ? {
//               $match: {
//                 $or: [
//                   { title: { $regex: query, $options: "i" } },
//                   { description: { $regex: query, $options: "i" } },
//                 ],
//               },
//             }
//           : null,
//         userId ? { $match: { userId: new mongoose.Types.ObjectId(userId) } } : null,
//         {
//           $lookup: {
//             from: "users",
//             localField: "userId",
//             foreignField: "_id",
//             as: "createdBy",
//           },
//         },
//         {
//           $unwind: {
//             path: "$createdBy",
//             preserveNullAndEmptyArrays: true,
//           },
//         },
//         {
//           $project: {
//             image: 1,
//             title: 1,
//             description: 1,
//             ingredients: 1,
//             steps: 1,
//             category: 1,
//             createdBy: {
//               username: 1,
//               avatar: 1,
//             },
//           },
//         },
//         {
//           $facet: {
//             metadata: [{ $count: "total" }],
//             data: [{ $sort: { createdAt: -1 } }, { $skip: (page - 1) * limit }, { $limit: limit }],
//           },
//         },
//       ].filter(Boolean)
//     );

//     console.log("Aggregation Result:", JSON.stringify(recipes, null, 2)); // Debugging Output

//     const metadata = recipes[0]?.metadata[0] || { total: 0 };
//     const RecipeData = recipes[0]?.data || [];

//     return res.status(200).json(
//       new ApiResponse(
//         200,
//         {
//           recipes: RecipeData,
//           totalRecipes: metadata.total,
//           pagelimit: limit,
//         },
//         "Recipes fetched successfully"
//       )
//     );
//   } catch (error) {
//     console.error("Aggregation Error:", error); // Log Error
//     return res.status(500).json({ message: "Server error", error: error.message });
//   }
// });

const getAllRecipe = asyncHandler(async (req, res) => {
  const recipes = await Recipe.find().sort({ createdAt: -1 });

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        recipes,
        totalRecipes: recipes.length,
      },
      "Recipes fetched successfully"
    )
  );
});

const getRecipeById = asyncHandler(async (req, res) => {
  const { recipeId } = req.params;
  //TODO: get video by id
  if (!isValidObjectId(recipeId)) {
    throw new ApiError(400, "Invalid video id");
  }

  const recipe = await Recipe.findById(recipeId);
  if (!recipe) {
    throw new ApiError(404, "Recipe not found");
  }

  return res.status(200).json(new ApiResponse(200, { recipe }, "Re fetched successfully"));
});

const updateRecipe = asyncHandler(async (req, res) => {
  const { recipeId } = req.params;
  //TODO: update Recipe details like title, description, image
  if (!isValidObjectId(recipeId)) {
    throw new ApiError(400, "Invalid recipe id");
  }

  const { title, description, ingredients, steps, category } = req.body;

  if (!title || !description || !ingredients || !steps || !category) {
    throw new ApiError(400, "Please provide all Recipe details");
  }

  const recipe = await Recipe.findById(recipeId);

  if (!recipe) {
    throw new ApiError(404, "Recipe not found");
  }

  if (!(recipe?.userId).equals(req.user?._id)) {
    throw new ApiError(400, "You cannot Update the details");
  }

  // Image Handling
  let newRecipeImageUrl = recipe.image; // Default to old image
  const recipeImageLocalPath = req.files?.recipeImage?.[0]?.path;

  if (recipeImageLocalPath) {
    // User uploaded a new image
    const newRecipeImage = await uploadOnCloudinary(recipeImageLocalPath);
    if (!newRecipeImage) {
      throw new ApiError(500, "Failed to upload recipe image to Cloudinary");
    }

    // Only delete the old image if a new one was successfully uploaded
    const deleteOldRecipeImage = await deleteInCloudinary(recipe.image);
    if (deleteOldRecipeImage.result !== "ok") {
      throw new ApiError(400, "Old image not deleted");
    }

    newRecipeImageUrl = newRecipeImage.url;
  } else if (image && image !== recipe.image) {
    // Edge case: If the frontend sends a different image URL, update it
    newRecipeImageUrl = image;
  }

  const updatedRecipe = await Recipe.findByIdAndUpdate(
    recipeId,
    {
      $set: {
        title,
        description,
        ingredients,
        steps,
        category,
        image: newRecipeImageUrl,
      },
    },
    {
      new: true,
    }
  );
  return res.status(200).json(new ApiResponse(200, updatedRecipe, "Updated Details of Recipe"));
});

const deleteRecipe = asyncHandler(async (req, res) => {
  const { recipeId } = req.params;

  if (!isValidObjectId(recipeId)) {
    throw new ApiError(400, "Invalid recipe ID");
  }

  const recipe = await Recipe.findById(recipeId);
  if (!recipe) {
    throw new ApiError(404, "Recipe not found");
  }

  if (!recipe.userId.equals(req.user._id)) {
    throw new ApiError(403, "You are not authorized to delete this recipe");
  }

  // Delete image from Cloudinary if it exists
  if (recipe.image) {
    const recipeImageDelete = await deleteInCloudinary(recipe.image);
    if (recipeImageDelete.result !== "ok") {
      throw new ApiError(400, "Failed to delete recipe image from Cloudinary");
    }
  }

  const deletedRecipe = await Recipe.findByIdAndDelete(recipeId);

  return res
    .status(200)
    .json(new ApiResponse(200, { deletedRecipe }, "Recipe deleted successfully"));
});

export { createRecipe, getAllRecipe, getRecipeById, updateRecipe, deleteRecipe };
