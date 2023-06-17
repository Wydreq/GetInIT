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
import PaymentConfirmedPage from "./pages/paymentPages/PaymentConfirmedPage";
import PaymentRefusedPage from "./pages/paymentPages/PaymenyRefusedPage";
import OfferApplicationPage from "./pages/OfferApplicationPage";
import ApplicationsPage from "./pages/companyPanel/ApplicationsPage";
import UserApplicationsPage from "./pages/UserApplicationsPage";
import ManualPaymentPage from "./pages/adminPanel/ManualPaymentPage";

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
      {path: 'manualPayment', element: <PrivateRoute><ManualPaymentPage/></PrivateRoute>},
      {path: 'userApplications', element: <PrivateRoute><UserApplicationsPage/></PrivateRoute>},
      {path: 'companyAccounts', element: <PrivateRoute><CompanyAccountsPage/></PrivateRoute>},
      {path: 'editInfo', element: <PrivateRoute><EditInfoPage/></PrivateRoute>},
      {path: 'userOffers', element: <PrivateRoute><OffersPage/></PrivateRoute>},
      {path: 'paymentConfirmed', element: <PrivateRoute><PaymentConfirmedPage/></PrivateRoute>},
      {path: 'paymentRefused', element: <PrivateRoute><PaymentRefusedPage/></PrivateRoute>},
      {path: 'offerApplication/:offerId', element: <PrivateRoute><OfferApplicationPage/></PrivateRoute>},
      {path: 'userOffers/applications/:offerId', element: <PrivateRoute><ApplicationsPage/></PrivateRoute>},
      {path: '*', element: <PrivateRoute><NotFoundPage/></PrivateRoute>}],
  }
])

function App() {
  return <RouterProvider router={router}/>;
}

export default App;
