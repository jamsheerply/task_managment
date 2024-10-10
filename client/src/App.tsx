import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import Task from "./pages/Task";
import Test from "./pages/Test";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./redux/store";
import { verifyUser } from "./redux/actions/user.action";

function App() {
  const { user, loading } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(verifyUser());
  }, [dispatch]);

  const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
    children,
  }) => {
    if (loading) {
      return <div>Loading...</div>;
    }
    if (!user?._id) {
      return <Navigate to="/login" />;
    }
    return <>{children}</>;
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route index element={<Home />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="login" element={<LogIn />} />
        {/* Protected routes */}
        <Route
          element={
            <ProtectedRoute>
              <Outlet />
            </ProtectedRoute>
          }
        >
          <Route path="task" element={<Task />} />
        </Route>
        <Route path="test" element={<Test />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
