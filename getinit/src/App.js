import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './pages/HomePage';
import RegisterPage from './pages/registerPages/RegisterPage';
import NotFoundPage from './pages/NotFoundPage';
import RootLayout from './pages/Root';
import './App.module.css';
import CompleteRegisterPage from './pages/registerPages/CompleteRegisterPage';

const router = createBrowserRouter([
  {
    path: '/', 
    element: <RootLayout/>,
    children: [
      {path: '/', element: <HomePage/>},
      {path: '/register', element: <RegisterPage/>},
      {path: '*', element: <NotFoundPage/>},
      {path: '/completeRegister', element: <CompleteRegisterPage/>}]
  }
])

function App() {
  return <RouterProvider router={router}/>;
}

export default App;
