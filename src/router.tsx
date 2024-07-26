import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from 'App';
import ItemsPage from 'pages/ItemsPage';
import AddItemPage from 'pages/AddItemPage';
import ItemsDetailPage from 'pages/ItemsDetailPage';
import { ImageUrlProvider } from 'contexts/ItemImageContext';
import LoginPage from 'pages/LoginPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/items',
        element: <ItemsPage />,
      },
      {
        path: '/addItem',
        element: (
          <ImageUrlProvider>
            <AddItemPage />
          </ImageUrlProvider>
        ),
      },
      {
        path: '/items/:productId',
        element: <ItemsDetailPage />,
      },
      {
        path: '/*',
        element: <h1>미구현 페이지 입니다.</h1>,
      },
    ],
  },
]);
