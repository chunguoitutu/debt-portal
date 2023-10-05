import {
  BrowserRouter as Router,
} from "react-router-dom";
import {useRoutes } from 'react-router-dom';

import SignIn from "../pages/SignIn";
import Applications from '../pages/Applications';
import Loans from '../pages/Loans';
import Borrowers from '../pages/Borrowers';
import MyTask from '../pages/MyTasks';
import Transactions from '../pages/Transactions';
import Header from "../pages/Header";
 
const App: React.FC = () => {

  // const isAuthenticated = false
  // <PrivateRoute path="/" element={<DashBoard />} isAuthenticated = {isAuthenticated}/>
  
  const routes = useRoutes([
    //public route
    { path: "/sign-in", element: <SignIn /> },
    
    //private route 
    { path: "/", 
      element: <Header />,
      children: [
        {
          path: 'applications',
          element: <Applications />
        },
        {
          path: 'loans',
          element: <Loans />
        },
        {
          path: 'borrowers',
          element: <Borrowers />
        },
        {
          path: 'my-task',
          element: <MyTask />
        },
        {
          path: 'transactions',
          element: <Transactions />
        }
      ] 

      }
  ]);
  return routes;
};

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default AppRoutes;


