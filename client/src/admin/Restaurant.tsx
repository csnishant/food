import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  RestaurantFormSchema,
  restaurantFromSchema,
} from "@/schema/restaurantSchema";
import { Loader2 } from "lucide-react";
import { FormEvent, useState } from "react";

const Restaurant = () => {
  const [input, setInput] = useState<RestaurantFormSchema>({
    restaurantName: "",
    city: "",
    country: "",
    deliveryTime: 0,
    cuisines: [],
    imageFile: undefined,
  });

  const [errors, setErrors] = useState<Partial<RestaurantFormSchema>>({});
  const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setInput({
      ...input,
      [name]: type === "number" ? Number(value) : value,
    });
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = restaurantFromSchema.safeParse(input);
    if (!result.success) {
      console.log("Validation errors:", result.error.formErrors.fieldErrors);
      const fieldErrors = result.error.formErrors.fieldErrors;
      setErrors(fieldErrors as Partial<RestaurantFormSchema>);
      return;
    }
    console.log("Validation success:", input);
  };

  const loading = false;
  const restaurent = false;
  return (
    <div className="max-w-6xl mx-auto  my-10">
      <div>
        <div>
          <h1 className="font-extrabold text-2xl mb-5">Add Restaurants</h1>
          <form onSubmit={submitHandler}>
            <div className="md:grid grid-cols-2 gap-6 space-y-2 md:space-y-0">
              {/* Restaurant Name  */}
              <div>
                <Label>Restaurant Name</Label>
                <Input
                  type="text"
                  name="restaurantName"
                  value={input.restaurantName}
                  onChange={changeEventHandler}
                  placeholder="Enter your restaurant name"
                />
                {errors && (
                  <span className="text-red-600">{errors.restaurantName}</span>
                )}
              </div>
              <div>
                <Label>City</Label>
                <Input
                  type="text"
                  name="city"
                  value={input.city}
                  onChange={changeEventHandler}
                  placeholder="Enter your city name"
                />
                {errors && <span className="text-red-600">{errors.city}</span>}
              </div>
              <div>
                <Label>Country</Label>
                <Input
                  type="text"
                  name="country"
                  value={input.country}
                  onChange={changeEventHandler}
                  placeholder="Enter your country name"
                />
                {errors && (
                  <span className="text-red-600">{errors.country}</span>
                )}
              </div>
              <div>
                <Label>Delivery Time</Label>
                <Input
                  type="number"
                  name="deliveryTime"
                  value={input.deliveryTime}
                  onChange={changeEventHandler}
                  placeholder="Enter your delivery time"
                />
                {errors && (
                  <span className="text-red-600">{errors.deliveryTime}</span>
                )}
              </div>
              <div>
                <Label>Cuisines</Label>
                <Input
                  type="text"
                  name="cuisines"
                  value={input.cuisines}
                  onChange={(e) =>
                    setInput({ ...input, cuisines: e.target.value.split(",") })
                  }
                  placeholder="e.g. Momos, Biryani"
                />
                {errors && (
                  <span className="text-red-600">{errors.cuisines}</span>
                )}
              </div>
              <div>
                <Label>Upload Restaurant Banner</Label>
                <Input type="file" accept="image/*" name="imageFile" />
                {errors && (
                  <span className="text-red-600">
                    {errors.imageFile?.name || "Image file is required"}
                  </span>
                )}
              </div>
            </div>

            <div className="my-5 w-fit">
              {/* if loading is true  */}
              {loading ? (
                <Button disabled>
                  {" "}
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> please wait
                </Button>
              ) : (
                // loading is false
                <Button>
                  {" "}
                  {restaurent
                    ? "Update Your Restaurant"
                    : "Add Your Restaurant"}
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Restaurant;
