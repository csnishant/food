import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
} from "./ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";

const CheckoutConfirmPage = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [input, setInput] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    contact: "1234567890",
    address: "123 Main Street",
    city: "Hometown",
    country: "Country",
  });
  const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const checkoutHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //api implementation start from here
    console.log(input);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogTitle className="font-semibold">Review Your Order</DialogTitle>
        <DialogDescription className="text-xs">
          Double-check your delivery details and ensure everything is in order.
          When you are ready, hit confirm button to finalize your order.
        </DialogDescription>
        <form
          onSubmit={checkoutHandler}
          className="md:grid grid-cols-2 gap-2 space-y-1 md:space-y-0">
          <div>
            <Label>Fullname</Label>
            <Input
              type="text"
              name="name"
              value={input.name}
              onChange={changeEventHandler}
            />
          </div>
          <div>
            <Label>Email</Label>
            <Input type="email" name="email" value={input.email} />
          </div>
          <div>
            <Label>Contact</Label>
            <Input type="text" name="contact" value={input.contact} />
          </div>
          <div>
            <Label>Address</Label>
            <Input type="text" name="address" value={input.address} />
          </div>
          <div>
            <Label>City</Label>
            <Input type="text" name="city" value={input.city} />
          </div>
          <div>
            <Label>Country</Label>
            <Input type="text" name="country" value={input.country} readOnly />
          </div>
          <DialogFooter className="col-span-2 pt-5">
            <Button className="">Continue To Payment</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutConfirmPage;
