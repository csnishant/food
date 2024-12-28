import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MenuFormSchema, menuSchema } from "@/schema/menuSchema";
import { Loader2 } from "lucide-react";
import React, {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";

const EditMenu = ({
  selectedMenu,
  editOpen,
  setEditOpen,
}: {
  selectedMenu: MenuFormSchema;
  editOpen: boolean;
  setEditOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [input, setInput] = useState<any>({
    name: "",
    description: "",
    price: 0,
    image: undefined,
  });
  const [error, setErrors] = useState<Partial<MenuFormSchema>>({});
  const loading = false;
  const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setInput({ ...input, [name]: type === "number" ? Number(value) : value });
  };
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = menuSchema.safeParse(input);
    if (!result.success) {
      const fieldErrors = result.error.formErrors.fieldErrors;
      setErrors(fieldErrors as Partial<MenuFormSchema>);
      return;
    }

    //api start here
  };

  useEffect(() => {
    setInput({
      name: selectedMenu?.name || "",
      description: selectedMenu?.description || "",
      price: selectedMenu?.price || "",
      image: undefined,
    });
  }, [selectedMenu]);
  return (
    <Dialog open={editOpen} onOpenChange={setEditOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Menu</DialogTitle>
          <DialogDescription>
            Update your menu to keep your offerings fresh and exciting!
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={submitHandler} className="space-y-4">
          <div>
            <Label>Name</Label>
            <Input
              type="text"
              name="name"
              value={input.name}
              onChange={changeEventHandler}
              placeholder="Enter menu name"
            />
            <span className="text-xs font-medium text-red-600">
              {error.name}
            </span>
          </div>
          <div>
            <Label>Description</Label>
            <Input
              type="text"
              name="description"
              value={input.description}
              onChange={changeEventHandler}
              placeholder="Enter menu description"
            />
            <span className="text-xs font-medium text-red-600">
              {
                error.description
                /* Error message for description */
              }
            </span>
          </div>
          <div>
            <Label>Price in (Rupees)</Label>
            <Input
              name="price"
              value={input.price}
              onChange={changeEventHandler}
              placeholder="Enter menu price"
            />
            <span className="text-xs font-medium text-red-600">
              {error.price /* Error message for price */}
            </span>
          </div>
          <div>
            <Label>Upload Menu Image</Label>
            <Input
              type="file"
              name="image"
              onChange={(e) =>
                setInput({
                  ...input,
                  image: e.target.files?.[0] || undefined,
                })
              }
            />
            <span className="text-xs font-medium text-red-600">
              {error.image?.name}
            </span>
          </div>
          <DialogFooter className="mt-5">
            {loading ? (
              <Button className="bg-green text-black hover:bg-hoverGreen">
                <Loader2 className="mr-2 w-4 h-4 animate-spin " />
                Please wait
              </Button>
            ) : (
              <Button className="bg-green text-black hover:bg-hoverGreen">
                Submit
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditMenu;