import Login from "./auth/Login";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
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
import { useUserStore } from "./store/useUserStore";
import { useEffect } from "react";
import Loading from "./components/Loading";

const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user } = useUserStore();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!user?.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }
  return children;
};

const AuthenticatedUser = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user } = useUserStore();
  if (isAuthenticated && user?.isVerified) {
    return <Navigate to="/" replace />;
  }
  return children;
};

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isAuthenticated } = useUserStore();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  if (!user?.admin) {
    return <Navigate to="/" replace />;
  }

  return children;
};
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoutes>
        <MainLayout />
      </ProtectedRoutes>
    ),
    children: [
      {
        path: "/",
        element: <HeroSection />,
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
        element: <Cart />,
      },
      {
        path: "/order/status",
        element: <Success />,
      },
      // admin services start from here
      {
        path: "/admin/restaurant",
        element: (
          <AdminRoute>
            <Restaurant />
          </AdminRoute>
        ),
      },
      {
        path: "/admin/menu",
        element: (
          <AdminRoute>
            <AddMenu />
          </AdminRoute>
        ),
      },
      {
        path: "/admin/orders",
        element: (
          <AdminRoute>
            <Orders />
          </AdminRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: (
      <AuthenticatedUser>
        <Login />
      </AuthenticatedUser>
    ),
  },
  {
    path: "/signup",
    element: (
      <AuthenticatedUser>
        <Signup />
      </AuthenticatedUser>
    ),
  },
  {
    path: "/forget-password",
    element: (
      <AuthenticatedUser>
        <ForgotPassword/>
      </AuthenticatedUser>
    ),
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
  const { checkAuthentication, isCheckingAuth } = useUserStore();
  useEffect(() => {
    checkAuthentication();
  }, [checkAuthentication]);

  if (isCheckingAuth) return <Loading />;
  return (
    <main>
      <RouterProvider router={appRouter}></RouterProvider>
    </main>
  );
}

export default App;
