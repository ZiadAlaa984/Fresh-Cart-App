import './App.css';
import Home from './Components/Home/Home';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import Products from './Components/Products/Products';
import Register from './Components/Register/Register';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import Notfound from './Components/Notfound/Notfound';
import Login from './Components/Login/Login';
import Heart from './Components/Heart/Heart';
import Brand from './Components/Brand/Brand';
import Card from './Components/Card/Card';
import Category from './Components/Category/Category';
import YourInfo from './Components/YourInfo/YourInfo';
import UserContextProvider from './Context/UserContext';
import CategoryDetails from './Components/CategoryDetails/CategoryDetails';
import ProtectRouter from './Components/ProtectRouter/ProtectRouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ProtectAuthority from './Components/ProtectAuthority/ProtectAuthority';
import CardContextProvider from './Context/CardContext';
import ResetPassword from './Components/ResetPassword/ResetPassword';
import Checkout from './Components/Checkout/Checkout';
import AllProducts from './Components/AllProducts/AllProducts';




const router = createBrowserRouter([
  {
    path: '', element: <Layout />, children: [
      { index: true, element: <Home /> },
      {
        path: 'Register', element: <ProtectAuthority> <Register /></ProtectAuthority>
      },
      { path: 'Login', element: <ProtectAuthority> <Login /></ProtectAuthority> },
      { path: 'Products', element: <ProtectRouter><Products /></ProtectRouter> },
      { path: 'ProductDetails/:id', element: <ProtectRouter><ProductDetails /></ProtectRouter> },
      { path: 'Category', element: <ProtectRouter><Category /></ProtectRouter> },
      { path: 'CategoryDetails/:id', element: <ProtectRouter><CategoryDetails /></ProtectRouter> },
      { path: 'Brand', element: <ProtectRouter><Brand /></ProtectRouter> },
      { path: 'Card', element: <ProtectRouter><Card /></ProtectRouter> },
      { path: 'YourInfo', element: <ProtectRouter><YourInfo /></ProtectRouter> },
      { path: 'ResetPassword', element: <ProtectRouter><ResetPassword /></ProtectRouter> },
      { path: 'ResetPassword', element: <ProtectRouter><ResetPassword /></ProtectRouter> },
      { path: 'Heart', element: <ProtectRouter><Heart /></ProtectRouter> },
      { path: 'Checkout', element: <ProtectRouter><Checkout /></ProtectRouter> },
      { path: 'AllProducts', element: <ProtectRouter><AllProducts /></ProtectRouter> },
      { path: '*', element: <Notfound /> },
    ]
  }
]);
function App() {
  return (
    <>
      <CardContextProvider>
        <UserContextProvider>
          <RouterProvider router={router}></RouterProvider>
        </UserContextProvider>
      </CardContextProvider>
    </>
  );
}

export default App;
