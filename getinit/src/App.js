import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import RootLayout from './pages/Root';
import './App.module.css';
import CompleteRegisterPage from './pages/registerPages/CompleteRegisterPage';
import AuthPage from './pages/AuthPage';
import {action as logoutAction} from "./pages/Logout";
import {tokenLoader} from './util/auth';

const router = createBrowserRouter([
  {
    path: '/',
    loader: tokenLoader,
    element: <RootLayout/>,
    id: 'root',
    errorElement: <NotFoundPage/>,
    children: [
      {path: '/', element: <HomePage/>},
      {path: '/auth', element: <AuthPage/>},
      {path: '/completeRegister', element: <CompleteRegisterPage/>},
      {path: '/logout', action: logoutAction}]
  }
])

function App() {
  return <RouterProvider router={router}/>;
}

export default App;
