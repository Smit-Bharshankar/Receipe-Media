import { FaStar, FaHeart, FaShare } from "react-icons/fa";
import cook1 from "../assets/cook_image1.jpg";

const RecipePostCard = () => {
  // Hardcoded Demo Data
  const recipePosts = [
    {
      id: 1,
      image: "https://source.unsplash.com/400x300/?food,pasta",
      title: "Delicious Pasta",
      description: "A simple yet mouth-watering pasta dish with fresh ingredients.",
      rating: 5,
    },
    {
      id: 2,
      image: "https://source.unsplash.com/400x300/?food,pizza",
      title: "Cheesy Pizza",
      description: "Homemade pizza with a crispy crust and loaded with toppings.",
      rating: 4,
    },
    {
      id: 3,
      image: "https://source.unsplash.com/400x300/?food,cake",
      title: "Chocolate Cake",
      description: "Rich and moist chocolate cake topped with creamy frosting.",
      rating: 5,
    },
    {
      id: 4,
      image: "https://source.unsplash.com/400x300/?food,salad",
      title: "Healthy Salad",
      description: "A refreshing and healthy salad with fresh veggies and dressing.",
      rating: 4,
    },
    {
      id: 5,
      image: "https://source.unsplash.com/400x300/?food,sushi",
      title: "Sushi Rolls",
      description: "Delicious homemade sushi rolls with fresh fish and avocado.",
      rating: 5,
    },
    {
      id: 6,
      image: "https://source.unsplash.com/400x300/?food,smoothie",
      title: "Berry Smoothie",
      description: "A refreshing berry smoothie packed with vitamins and flavor.",
      rating: 4,
    },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-6 px-6 py-8">
      {recipePosts.map(({ id, image, title, description, rating }) => (
        <div
          key={id}
          className="bg-white rounded-lg shadow-md p-4 w-full sm:w-[48%] md:w-[45%] lg:w-[40%]"
        >
          {/* Title & Rating */}
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-bold">{title}</h2>
            <div className="flex text-yellow-500">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className={i < rating ? "text-yellow-500" : "text-gray-300"} />
              ))}
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm mb-3">{description}</p>

          {/* Image */}
          <img src={cook1} alt={title} className="w-full h-48 object-cover rounded-lg mb-3" />

          {/* Buttons */}
          <div className="flex justify-between items-center">
            <button className="flex items-center gap-2 text-red-500 hover:text-red-600">
              <FaHeart /> Like
            </button>
            <button className="flex items-center gap-2 text-blue-500 hover:text-blue-600">
              <FaShare /> Share
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecipePostCard;
