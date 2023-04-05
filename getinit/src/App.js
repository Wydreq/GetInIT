import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import RootLayout from './pages/Root';
import './App.module.css';
import CompleteRegisterPage from './pages/registerPages/CompleteRegisterPage';
import AuthPage from './pages/AuthPage';

const router = createBrowserRouter([
  {
    path: '/', 
    element: <RootLayout/>,
    children: [
      {path: '/', element: <HomePage/>},
      {path: '/auth', element: <AuthPage/>},
      {path: '*', element: <NotFoundPage/>},
      {path: '/completeRegister', element: <CompleteRegisterPage/>}]
  }
])

function App() {
  return <RouterProvider router={router}/>;
}

export default App;
