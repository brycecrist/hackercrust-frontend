import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {StoryDetail} from "./pages/storyDetail";
import {loader} from "./components/story";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "storyDetail/:storyId",
    element: <StoryDetail />
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <RouterProvider router={router} />
)
