import Login from "./auth/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ResetPassword from "./auth/ResetPassword";
import VerifyEmail from "./auth/VerifyEmail";
import MainLayout from "./layout/MainLayout";
import Profile from "./components/Profile";
import SearchPage from "./components/SearchPage";
import Restaurant from "./admin/Restaurant";
import AddMenu from "./admin/AddMenu";
import Orders from "./admin/Orders";
import Success from "./components/Success";
import HeroSection from "./components/HeroSection";
import RestaurantDetail from "./components/RestaurentDetail";
import Cart from "./components/cart";
import ForgotPassword from "./auth/ForgetPassword";
import Signup from "./auth/Signup";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: (
     
        <MainLayout />
   
    ),
    children: [
      {
        path: "/",
        element: <HeroSection/>,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/search/:text",
        element: <SearchPage />,
      },
      {
        path: "/restaurant/:id",
        element: <RestaurantDetail />,
      },
      {
        path: "/cart",
        element: <Cart/>,
      },
      {
        path: "/order/status",
        element: <Success />,
      },
      // admin services start from here
      {
        path: "/admin/restaurant",
        element:<Restaurant />,
      },
      {
        path: "/admin/menu",
        element:<AddMenu />,
      },
      {
        path: "/admin/orders",
        element:<Orders />,
      },
    ],
  },
  {
    path: "/login",
    element:<Login />,
  },
  {
    path: "/signup",
    element:<Signup /> ,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword/>,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/verify-email",
    element: <VerifyEmail />,
  },
]);

function App() {
 
  // checking auth every time when page is loaded

  return (
    <main>
      <RouterProvider router={appRouter}></RouterProvider>
    </main>
  );
}

export default App;