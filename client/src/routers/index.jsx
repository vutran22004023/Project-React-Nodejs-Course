import React   from "react";
import { createBrowserRouter } from "react-router-dom";
import {Private} from './private'
import HomePages from '../pages/HomePages/index'
import HomePage from '../pages/HomePages/ContentPage/HomePage/HomePage'
export default createBrowserRouter([
    {
        element: <Private />,
        path: "/",
        children: [
            {
                element: <HomePages />,
                path: "/",
                children: [
                    {
                        element: <HomePage />,
                        path: "/",
                    }
                ],
            }
        ],
    }
])