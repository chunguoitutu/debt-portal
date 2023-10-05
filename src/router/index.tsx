import {
  BrowserRouter as Router,
} from "react-router-dom";

import {useRoutes } from 'react-router-dom';
import Applications from '../pages/Applications';
import Loans from '../pages/Loans';
import Borrowers from '../pages/Borrowers';
import MyTask from '../pages/MyTasks';
import Transactions from '../pages/Transactions';
import DashBoard from "../pages/Dashboard";
import SignIn from "../pages/SignIn";
 


const App = () => {

  // const isAuthenticated = false

  const routes = useRoutes([
    //public route
    { path: "/sign-in", element: <SignIn /> },
    
    //private route 
    // <PrivateRoute path="/" element={<DashBoard />} isAuthenticated = {isAuthenticated}/>
    { path: "/", element: <DashBoard /> },
    { path: "/applications", element: <Applications /> },
    { path: '/loans' , element: <Loans /> },
    { path: "/borrowers", element: <Borrowers /> },
    { path: "/my-tasks", element: <MyTask /> },
    { path: "/transactions", element: <Transactions /> },
  ]);
  return routes;
};

const AppRoutes = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default AppRoutes;


