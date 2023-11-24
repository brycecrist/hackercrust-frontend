import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import {StoryDetail} from "./pages/storyDetail";

const router = createBrowserRouter([
  {
    path: "/stories/1",
    element: <App />
  },
  {
    path: "/stories/:pageNumber",
    element: <App />
  },
  {
    path: "/storyDetails",
    element: <StoryDetail />
  },
  {
    path: "/",
    element: <Navigate to="/stories/1" replace />
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <RouterProvider router={router} />
)
