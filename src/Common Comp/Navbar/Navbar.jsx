import React, { useEffect , useState } from 'react';
import "./navbar.css";
import { useDispatch, useSelector } from 'react-redux';
import { fromAddress } from "../../Redux/networkSlice";
import { Link } from 'react-router-dom';
import { logout } from '../../Redux/authSlice';

const Navbar = () => {
  const [arrow, setArrow] = useState(false)
  const dispatch = useDispatch();
  const from = useSelector((state) => state.network.from);
  const provider = window.ethereum;
  const [user , setUser] = useState({});

  const connectToMetaMask = async () => {
    try {
      if (provider) {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

        dispatch(fromAddress(accounts[0]))
      } else {
        console.error('MetaMask not installed');
      }
    } catch (error) {
      console.error('Error connecting to MetaMask:', error);
    }
  };

  if (provider) {
    provider.on('accountsChanged', (error) => {
      dispatch(fromAddress(""))
    });
  }

  const arrowChange = () => {
    setArrow(!arrow)
  }

  useEffect(() => {
    const {decodedToken} = JSON.parse(localStorage.getItem("Atomic_Swap"));
    console.log(decodedToken);
    setUser({email : decodedToken?.email , name : decodedToken?.firstname.toUpperCase() , profileImageURL : decodedToken?.profileImageURL})
  }, [])
  

  return (
    <div className='main'>
      <div className='nav-outer d-flex justify-between'>
        <div>
          <ul className='d-flex nav-ul'>
            <li ><Link to="/">Home |</Link></li>
            <li className='ml-10'><Link to="/withdraw"> Withdraw |</Link></li>
            <li className='ml-10'><Link to="/get-block"> Get Block |</Link></li>
            <li className='ml-10'><Link to="/transaction"> Transaction |</Link></li>
            <li className='ml-10'><Link to="/refund"> Refund |</Link></li>
            <li className='ml-10'><Link to="/log-in"> login |</Link></li>
          </ul>
        </div>
        <div className='d-flex'>
          <button className='metamask-button' onClick={connectToMetaMask}>{from !== "" ? "Metamask Is Connected" : "Connect to MetaMask"}</button>
          <div className='ml-10'>
            {
              arrow
                ?
                <p className='arrow' onClick={arrowChange}>↑</p>
                :
                <p className='arrow' onClick={arrowChange}>↓</p>
            }
          </div>
          <div className={`profile ${arrow ? "" : "d-none"}`}>
            <div className='profile-image m-auto'>
              <img src={`${user?.profileImageURL}`} alt="" />
            </div>
            <p className="text-center">{user?.name}</p>
            <button className='m-auto d-block' onClick={()=> {dispatch(logout()); localStorage.clear();}}>Log Out</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
