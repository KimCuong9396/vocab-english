import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import HandBook from "./pages/handBook.jsx";
import Conversation from "./pages/conversation.jsx";
import LearnNew from "./pages/learnNew.jsx";
import Revise from "./pages/revise.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import FlashCard from "./components/FlashCard.jsx";
import Home from "./pages/home.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    //errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "/conversation",
        element: <Conversation />,
      },
      {
        path: "/handBook",
        element: <HandBook />,
      },
      {
        path: "/learNew",
        element: <LearnNew />,
      },
      {
        path: "/revise",
        element: <Revise />,
      },
    ],
  },
  // {
  //   path: "/register",
  //   element: <RegisterPage />,
  // },
  // {
  //   path: "/login",
  //   element: <LoginPage />,
  // },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
