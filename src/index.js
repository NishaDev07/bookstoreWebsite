// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './Pages/App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Shop from './Pages/Shop';
import NoPage from './Pages/NoPage';
import BookPage from './Pages/BookPage';
import BuyPage from './Pages/BuyPage';
import { WishListProvider } from './contexts/WishListContext';
import WishListPage from './Pages/WishListPage';
import About from './Pages/About'
import { ShoppingListProvider } from './contexts/ShoppingCartContext';
import Login from './Pages/loginPage';
import Signup from './Pages/SignupPage';
import Dashboard from './Pages/DashboardBookSell';
import EditPage from "./Components/EditPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/Shop",
    element: <Shop />
  },
  {
    path: "/book/:id",
    element: <BookPage />
  },
  {
    path: "/Cart",
    element: <BuyPage />
  },
  {
    path: "/WishList",
    element: <WishListPage />
  },
  {
    path: "/about",
    element: <About />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/Signup",
    element:<Signup/>
  },
  {
    path: "/Dashboard",
    element: <Dashboard />
  },
  {
    path:"*",
    element: <NoPage />
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <WishListProvider>
      <ShoppingListProvider>
        <RouterProvider router={router} />
      </ShoppingListProvider>
    </WishListProvider>
  </React.StrictMode>
);

reportWebVitals();
