import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { LoginInputState, userLoginSchema } from "@/schema/userSchema";
import { useUserStore } from "@/store/useUserStore";
import { Loader2, LockKeyhole, Mail } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [input, setInput] = useState<LoginInputState>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<LoginInputState>>({});
  const { loading, login } = useUserStore();
  const navigate = useNavigate();
  const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const ErrorMessage = ({ message }: { message?: string }) => {
    return message ? (
      <span className="text-xs text-red-500 ">{message} </span>
    ) : null;
  };
  const loginSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();
    //form validation check start
    const result = userLoginSchema.safeParse(input);
    if (!result.success) {
      const fieldErrors = result.error.formErrors.fieldErrors;
      setErrors(fieldErrors as Partial<LoginInputState>);
      return;
    }
    try {
      await login(input);
      navigate("/");
    } catch (error) {
      console.log(error);
      {
        console.log(error);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={loginSubmitHandler}
        className="md:p-8 w-full max-w-md rounded-lg md:border border-gray-500 mx-4">
        <div className="mb-4">
          <h1 className="font-bold text-2xl">PatelEats</h1>
        </div>
        <div className="mb-4">
          <div className="relative">
            <Input
              type="email"
              placeholder="Email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              className="pl-10 focus-visible:ring-1"
              autoComplete="email"
            />
            <Mail className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
            <ErrorMessage message={errors.email} />
          </div>
        </div>
        <div className="mb-4">
          <div className="relative">
            <Input
              type="password"
              placeholder="Password"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
              className="pl-10 focus-visible:ring-1"
              autoComplete="current-password"
            />
            <LockKeyhole className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
            <ErrorMessage message={errors.password} />
          </div>
        </div>
        <div className="mb-10">
          {loading ? (
            <Button
              type="submit"
              className=" w-full text-button hover:bg-hover hover:text-black ">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              please wait
            </Button>
          ) : (
            <Button
              type="submit"
              className=" w-full bg-button hover:bg-hover   ">
              Login
            </Button>
          )}
          <div className="mt-4">
            <Link to="/forget-password" className="pt-4">
              Forget Password
            </Link>
          </div>
        </div>
        <Separator />
        <p className="mt-2">Don't have an account? </p>
        <Link to="/signup" className="text-blue-600">
          Signup
        </Link>
      </form>
    </div>
  );
};

export default Login;
