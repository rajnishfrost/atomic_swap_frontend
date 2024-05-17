import React, { useEffect, useRef, useState } from 'react';
import "./navbar.css";
import { useDispatch, useSelector } from 'react-redux';
import { fromAddress } from "../../Redux/networkSlice";
import { Link } from 'react-router-dom';
import { logout } from '../../Redux/authSlice';
import { profileImageUpload } from '../../API/auth';

const Navbar = () => {
  const [arrow, setArrow] = useState(false)
  const dispatch = useDispatch();
  const from = useSelector((state) => state.network.from);
  const provider = window.ethereum;
  const [user, setUser] = useState({});
  const inputRef = useRef(null);
  const [image, setImage] = useState("");

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

  const handleImageclick = () => {
    inputRef.current.click();
  }

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  useEffect(() => {
    const { decodedToken } = JSON.parse(localStorage.getItem("Atomic_Swap"));
    setUser({ email: decodedToken?.email, name: decodedToken?.firstname.toUpperCase(), profileImageURL: decodedToken?.profileImageURL })
  }, []);

  useEffect(() => {
    const formData = new FormData();
     formData.append("profileImage", image);
     profileImageUpload(formData);
     // eslint-disable-next-line
  }, [image])

  return (
    <div className='main'>
      <div className='nav-outer d-flex justify-between'>
        <div>
          <ul className='d-flex nav-ul'>
            <li ><Link to="/">Home |</Link></li>
            <li className='ml-10'><Link to="/transaction"> Transaction |</Link></li>
            <li className='ml-10'><Link to="/get-block"> Get Block |</Link></li>
            <li className='ml-10'><Link to="/withdraw"> Withdraw |</Link></li>
            <li className='ml-10'><Link to="/refund"> Refund |</Link></li>
            <li className='ml-10'><Link to="/contract-status">Contract Status |</Link></li>
            <li className='ml-10'><Link to="/networks">Networks</Link></li>
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
            <form className='profile-image m-auto' onClick={() => handleImageclick()}>
              <img src={`${user?.profileImageURL}`} alt="Upload" />
              <input type="file" ref={inputRef} accept='image/*' onChange={(e) => handleImageChange(e)} className='d-none' />
            </form>
            <p className="text-center">{user?.name}</p>
            <button className='m-auto d-block' onClick={() => { dispatch(logout()); localStorage.clear(); }}>Log Out</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
