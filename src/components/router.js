import { createBrowserRouter } from "react-router-dom";
import Register from "./auth/Register";
import Login from "./auth/Login";
import Home from "./auth/home";

const router = createBrowserRouter([

    { path: '/register', element: <Register /> },
    { path: '/login', element: <Login /> },
    { path: '/', element: <Home /> }

])


export default router;