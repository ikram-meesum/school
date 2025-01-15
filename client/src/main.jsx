import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./components/Login.jsx";
import Home from "./components/Home.jsx";
// import Classes from "./components/Classes.jsx";
import AddStudent from "./components/AddStudent.jsx";
import Fee from "./components/Fee.jsx";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Login />,
//   },
//   {
//     // path: "/comment/:id/:tid",
//     path: "/home",
//     element: <Home />,
//   },
//   {
//     path: "/student",
//     element: <AddStudent />,
//   },
//   {
//     path: "/fee",
//     element: <Fee />,
//   },
// ]);

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/student" element={<AddStudent />} />
      <Route path="/fee" element={<Fee />} />
    </Routes>
    {/* <App /> */}
  </BrowserRouter>
);

// createRoot(document.getElementById("root")).render(
//   <StrictMode>
//     {/* <App /> */}
//     <RouterProvider router={router} />
//   </StrictMode>
// );
