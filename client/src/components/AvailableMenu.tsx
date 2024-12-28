import { MenuItem } from "@/types/restaurantType";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";

const AvailableMenu = ({ menus }: { menus: MenuItem[] }) => {
  return (
    <div className="md:p-4">
      <h1 className="text-xl md:text-2xl font-extrabold mb-6">
        Available Menus
      </h1>
      <div className="grid md:grid-cols-3 space-y-4 md:space-y-0">
        {menus.map((menu: MenuItem, index) => (
          <Card
            key={index}
            className="max-w-xs mx-auto shadow-lg rounded-lg overflow-hidden">
            <img src={menu.image} alt="" className="w-full h-40 object-cover" />
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                {menu.name}
              </h2>
              <p className="text-sm text-gray-600 mt-2">{menu.description}</p>
              <h3 className="text-lg font-semibold mt-4">
                Price: <span className="text-[#D19254]">₹{menu.price}</span>
              </h3>
            </CardContent>
            <CardFooter className="p-4">
              <Button
                className="bg-hoverGreen text-black hover:bg-teal-600  font-semibold py-2 px-4 rounded-full shadow-md transition-colors duration-200"
              >
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
