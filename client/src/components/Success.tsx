import { IndianRupee, Loader2 } from "lucide-react";
import { Separator } from "./ui/separator";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const Success = () => {
    const loading=false;
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 max-w-lg w-full">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
            Order Status: <span className="text-[#FF5A5A]">CONFIRM</span>
          </h1>
        </div>
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Order Summary
          </h2>
          {/* Static Ordered Item Display */}
          <div className="mb-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <img
                  src="https://via.placeholder.com/56"
                  alt="Item"
                  className="w-14 h-14 rounded-md object-cover"
                />
                <h3 className="ml-4 text-gray-800 dark:text-gray-200 font-medium">
                  Sample Item Name
                </h3>
              </div>
              <div className="text-right">
                <div className="text-gray-800 dark:text-gray-200 flex items-center">
                  <IndianRupee />
                  <span className="text-lg font-medium">500</span>
                </div>
              </div>
            </div>
            <Separator className="my-4" />
          </div>
        </div>
        <Link to="/cart">
          {loading ? (
            <Button className="bg-green text-black hover:bg-hoverGreen">
              <Loader2 className="mr-2 w-4 h-4 animate-spin " />
              Please wait
            </Button>
          ) : (
            <Button className="bg-green text-black hover:bg-hoverGreen">
              Continue Shopping
            </Button>
          )}
        </Link>
      </div>
    </div>
  );
};

export default Success;
