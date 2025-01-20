import { StrictMode } from 'react'

import   { createRoot } from "react-dom/client";
import './index.css'
import App from './App.jsx'
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Auth from './Auth.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store.js';
import User from './pages/User.jsx';
import UserProfile from './components/UserProfile.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Parent route
    children: [
      {
        path: "/", // Default route
        element: <Home />,
      },
      {
        path: "user/:userId", // Dynamic route
        element: <User />,
      }
    ],
  },
  
  {
    path: "auth",
    element: <Auth />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup/>,
      },
    ],
  },
]);



createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </Provider>
);
