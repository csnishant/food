import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { MenuItem } from "@/types/restaurantTypes";
import { useCartStore } from "@/store/userCartStore";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const DescriptionWithToggle = ({ description }: { description: string }) => {
  const [isExpanded, setIsExpanded] = useState(false); // State to toggle description
  const words = description.split(" ");
  const shouldTruncate = words.length > 9;
  return (
    <div>
      <p className="text-sm text-gray-600 mt-2">
        {isExpanded || !shouldTruncate
          ? description // Show full description
          : words.slice(0, 9).join(" ") + "..."}{" "}
        {/* Show truncated description */}
      </p>
     
       {shouldTruncate && ( // Show button only if words > 9
        <button
          onClick={() => setIsExpanded(!isExpanded)} // Toggle description
          className="text-blue-500 font-medium mt-2 hover:underline"
        >
          {isExpanded ? "Read Less" : "Read More"}
        </button>
      )}
    </div>
  );
};
const AvailableMenu = ({ menus }: { menus: MenuItem[] }) => {
  const { addToCart } = useCartStore();
  const navigate = useNavigate();
  return (
    <div className="md:p-4">
      <h1 className="text-xl md:text-2xl font-extrabold mb-6">
        Available Menus
      </h1>
      <div className="grid md:grid-cols-3 space-y-4 md:space-y-0 gap-4">
        {menus.map((menu: MenuItem, index) => (
          <Card
            key={index}
            className="max-w-xs mx-auto shadow-lg rounded-lg overflow-hidden min-h-[400px]">
            <img src={menu.image} alt="" className="w-full h-40 object-cover" />
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                {menu.name}
              </h2>

              <DescriptionWithToggle description={menu.description} />

              <h3 className="text-lg font-semibold mt-4">
                Price: <span className="text-[#D19254]">₹{menu.price}</span>
              </h3>
            </CardContent>
            <CardFooter className="p-4">
              <Button
                onClick={() => {
                  addToCart(menu);
                  navigate("/cart");
                }}
                className="bg-hoverGreen text-black hover:bg-teal-600  font-semibold py-2 px-4 rounded-full shadow-md transition-colors duration-200">
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AvailableMenu;
