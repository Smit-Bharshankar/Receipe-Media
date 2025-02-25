import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addRecipe } from "../Store/Slices/recipeSlice";
import { toast } from "react-toastify";

const RecipeForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.recipes);

  const onSubmit = async (data) => {
    const { title, description, ingredients, steps, category, imageFile } = data;

    // Create FormData to send to backend
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("recipeImage", imageFile[0]); // Image file
    formData.append("ingredients", JSON.stringify(ingredients.split(","))); // Convert to array
    formData.append("steps", JSON.stringify(steps.split(","))); // Convert to array

    const resultAction = await dispatch(addRecipe(formData));

    if (addRecipe.fulfilled.match(resultAction)) {
      toast.success("Recipe added successfully!");
      reset(); // Clear form on success
    } else {
      toast.error(resultAction.payload?.message || "Failed to add recipe.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg space-y-4"
    >
      <h2 className="text-2xl font-bold text-gray-700 text-center">Add New Recipe</h2>

      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="space-y-2">
        <input
          {...register("title", { required: true })}
          placeholder="Recipe Title"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          {...register("description")}
          placeholder="Description"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          {...register("category")}
          placeholder="Category"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          {...register("ingredients")}
          placeholder="Ingredients (comma-separated)"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          {...register("steps")}
          placeholder="Steps (comma-separated)"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="file"
          {...register("imageFile", { required: true })}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-300"
      >
        {loading ? "Adding Recipe..." : "Submit Recipe"}
      </button>
    </form>
  );
};

export default RecipeForm;
