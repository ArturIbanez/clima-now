import { createBrowserRouter } from "react-router-dom";

import { Home } from "./pages/home";
import { Detail } from "./pages/detail";

const router = createBrowserRouter([
    {
        children: [
            {
                path: "/",
                element: <Home/>
            },
            {
                path:"/details/:cidade",
                element: <Detail/>
            }
        ]
    }
])

export { router }