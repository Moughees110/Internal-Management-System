import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import "./index.css";
import App from "./App";
import Login from "./components/login";
import Dashboard from "./components/Dashboard";
import Checkin from "./components/Checkin";
import Checkout from "./components/Checkout";
import User from "./components/User";
import Role from "./components/Role";
import Employee from "./components/Employee";
import Client from "./components/Client";
import Task from "./components/Task";
import Applyleave from "./components/Applyleave";
import Leavehistory from "./components/Leavehistory";
import Handbook from "./components/Handbook";
import Projects from "./components/Projects";
import ProtectedRoute from "./components/ProtectedRoute";
import { SidebarProvider } from "./context/Sidebarcontext";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    children: [
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/handbook", element: <Handbook /> },
      { path: "/checkin", element: <Checkin /> },
      { path: "/checkout", element: <Checkout /> },
      { path: "/user", element: <User /> },
      { path: "/role", element: <Role /> },
      { path: "/employee", element: <Employee /> },
      { path: "/task", element: <Task /> },
      { path: "/client", element: <Client /> },
      { path: "/apply-leave", element: <Applyleave /> },
      { path: "/leave-history", element: <Leavehistory /> },
      { path: "/projects", element: <Projects /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <SidebarProvider>
      <RouterProvider router={router} />
    </SidebarProvider>
  </Provider>
);
