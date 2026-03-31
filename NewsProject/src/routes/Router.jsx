import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import {Home, About, Article, Search} from "../pages/export.js"

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        children: [
            {index: true, element: <Home/>},
            {path: "/about", element: <About/>},
            {path: "/article", element: <Article/>},
            {path: "/search", element: <Search/>},
        ]
    }
]);


export default router;