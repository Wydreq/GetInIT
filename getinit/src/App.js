import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import RootLayout from './pages/Root';
import './App.module.css';
import CompleteRegisterPage from './pages/registerPages/CompleteRegisterPage';
import AuthPage from './pages/AuthPage';
import {action as logoutAction} from "./pages/Logout";

import PrivateRoute, {tokenLoader, TokenRoute} from './util/auth';
import CompanyPanel from "./pages/companyPanel/CompanyPanel";
import CompanyAccountsPage from "./pages/companyPanel/CompanyAccountsPage";
import EditInfoPage from "./pages/companyPanel/EditInfoPage";
import OffersPage from "./pages/companyPanel/OffersPage";

const router = createBrowserRouter([
  {
    path: '/',
    loader: tokenLoader,
    element: <RootLayout/>,
    id: 'root',
    errorElement: <NotFoundPage/>,
    children: [
      {path: '/', element: <HomePage/>},
      {path: 'auth', element: <TokenRoute><AuthPage/></TokenRoute>},
      {path: 'signUp', element: <CompleteRegisterPage/>},
      {path: 'logout', action: logoutAction},
      {path: 'companyPanel', element: <PrivateRoute><CompanyPanel/></PrivateRoute>},
      {path: 'companyAccounts', element: <PrivateRoute><CompanyAccountsPage/></PrivateRoute>},
      {path: 'editInfo', element: <PrivateRoute><EditInfoPage/></PrivateRoute>},
      {path: 'userOffers', element: <PrivateRoute><OffersPage/></PrivateRoute>}],
  }
])

function App() {
  return <RouterProvider router={router}/>;
}

export default App;
