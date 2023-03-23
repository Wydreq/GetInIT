import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import NotFoundPage from './pages/NotFound';
import RootLayout from './pages/Root';

const router = createBrowserRouter([
  {
    path: '/', 
    element: <RootLayout/>,
    children: [
      {path: '/', element: <HomePage/>},
      {path: '/login', element: <LoginPage/>},
      {path: '*', element: <NotFoundPage/>}]
  }
])

function App() {
  return <RouterProvider router={router}/>;
}

export default App;
