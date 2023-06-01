import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import RootLayout from './pages/Root';
import './App.module.css';
import CompleteRegisterPage from './pages/registerPages/CompleteRegisterPage';
import AuthPage from './pages/AuthPage';
import {action as logoutAction} from "./pages/Logout";

import PrivateRoute, {tokenLoader, TokenRoute} from './util/auth';
import UserPanel from "./pages/companyPanel/UserPanel";
import CompanyAccountsPage from "./pages/companyPanel/CompanyAccountsPage";
import EditInfoPage from "./pages/companyPanel/EditInfoPage";
import OffersPage from "./pages/companyPanel/OffersPage";
import PaymentPage from "./pages/companyPanel/PaymentPage";

const router = createBrowserRouter([
  {
    path: '/',
    loader: tokenLoader,
    element: <RootLayout/>,
    id: 'root',
    children: [
      {path: '/', element: <PrivateRoute><HomePage/></PrivateRoute>},
      {path: 'auth', element: <TokenRoute><AuthPage/></TokenRoute>},
      {path: 'signUp', element: <CompleteRegisterPage/>},
      {path: 'logout', action: logoutAction},
      {path: 'userPanel', element: <PrivateRoute><UserPanel/></PrivateRoute>},
      {path: 'companyAccounts', element: <PrivateRoute><CompanyAccountsPage/></PrivateRoute>},
      {path: 'editInfo', element: <PrivateRoute><EditInfoPage/></PrivateRoute>},
      {path: 'userOffers', element: <PrivateRoute><OffersPage/></PrivateRoute>},
      {path: '/subscriptionPayment', element: <PrivateRoute><PaymentPage/></PrivateRoute>},
      {path: '*', element: <PrivateRoute><NotFoundPage/></PrivateRoute>}],
  }
])

function App() {
  return <RouterProvider router={router}/>;
}

export default App;
