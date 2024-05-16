import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import NewContract from './Pages/NewContract/NewContract';
import Login from './Pages/UserCredential/Login';
import Signup from './Pages/UserCredential/Signup';
import PageNotFound from './Pages/PageNotFound/PageNotFound';
import ProtectedRoute from "./Common Comp/ProtectedRoute/ProtectedRoute";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { verifyToken } from './API/auth';
import Withdraw from "./Pages/Withdraw/Withdraw";
import GetBlock from "./Pages/GetBlock/GetBlock";
import Transaction from "./Pages/Transaction/Transaction";
import Refund from "./Pages/Refund/Refund"
import PublicRoute from './Common Comp/ProtectedRoute/PublicRoute';

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  useEffect(() => {
    verifyToken(dispatch, navigate );
    // eslint-disable-next-line
  }, [])

  return (
    <div className='dark'>
      <Routes>
        <Route element={<PublicRoute isAuthenticated={isAuthenticated && isAuthenticated} />}>
          <Route path='/log-in' element={<Login />}></Route>
          <Route path='/sign-up' element={<Signup />}></Route>
        </Route>
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated && isAuthenticated} />}>
          <Route path='/' element={<NewContract />}></Route>
          <Route path='/withdraw' element={<Withdraw />}></Route>
          <Route path='/get-block' element={<GetBlock />}></Route>
          <Route path='/transaction' element={<Transaction />}></Route>
          <Route path='/refund' element={<Refund />}></Route>
        </Route>
        <Route path='*' element={<PageNotFound />}></Route>
      </Routes>
    </div>
  );
}

export default App;
