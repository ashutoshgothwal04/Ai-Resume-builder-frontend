import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home/Home.jsx";
import Dashboard from "./Dashboard/Dashboard.jsx";
import { ClerkProvider } from "@clerk/clerk-react";
import SignInPage from "./auth/sign-in/SignInPage.jsx";
import EditResume from "./Dashboard/components/resume/[resumeId]/edit/EditResume";
import ViewResume from "./my-resume/[resumeId]/view/ViewResume";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const router = createBrowserRouter([
  {
    element: <App/>,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },{
        path: "/dashboard/resume/:resumeId/edit",
        element: <EditResume />,
      }
    ],
  },
  // Add more routes here
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/auth/sign-in",
    element: <SignInPage/>
  },
  {
    path: "/my-resume/:resumeId/view",
    element: <ViewResume/>
  }
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <RouterProvider router={router}></RouterProvider>
    </ClerkProvider>
  </StrictMode>
);
