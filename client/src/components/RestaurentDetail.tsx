import AvailableMenu from "./AvailableMenu.tsx";
import { Badge } from "./ui/badge";
import { Timer } from "lucide-react";

const RestaurantDetail = () => {
  // Hardcoded data for static version
  const singleRestaurant = {
    imageUrl: "/path/to/static/image.jpg",
    restaurantName: "Sample Restaurant",
    cuisines: ["Italian", "Chinese", "Indian"],
    deliveryTime: 30,
    menus: [
      // Add static menu items here as required
      { name: "Pizza", price: "$12", description: "Delicious cheese pizza" },
      { name: "Pasta", price: "$10", description: "Classic Italian pasta" },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto my-10">
      <div className="w-full">
        <div className="relative w-full h-32 md:h-64 lg:h-72">
          <img
            src={singleRestaurant.imageUrl}
            alt="res_image"
            className="object-cover w-full h-full rounded-lg shadow-lg"
          />
        </div>
        <div className="flex flex-col md:flex-row justify-between">
          <div className="my-5">
            <h1 className="font-medium text-xl">
              {singleRestaurant.restaurantName}
            </h1>
            <div className="flex gap-2 my-2">
              {singleRestaurant.cuisines.map((cuisine, idx) => (
                <Badge key={idx}>{cuisine}</Badge>
              ))}
            </div>
            <div className="flex md:flex-row flex-col gap-2 my-5">
              <div className="flex items-center gap-2">
                <Timer className="w-5 h-5" />
                <h1 className="flex items-center gap-2 font-medium">
                  Delivery Time:{" "}
                  <span className="text-[#D19254]">
                    {singleRestaurant.deliveryTime} mins
                  </span>
                </h1>
              </div>
            </div>
          </div>
        </div>
        {singleRestaurant.menus && (
          <AvailableMenu menus={singleRestaurant.menus} />
        )}
      </div>
    </div>
  );
};

export default RestaurantDetail;
