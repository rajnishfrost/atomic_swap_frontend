import React from 'react';
import "./navbar.css";
import { useDispatch, useSelector } from 'react-redux';
import { fromAddress } from "../../Redux/networkSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const from = useSelector((state) => state.network.from);
  const provider = window.ethereum;

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


  console.log(from);
  return (
    <div className='p10 nav'>
      <div className='buttonOuter'>
        <button className='buttonNav' onClick={connectToMetaMask}>{from !== "" ? "Metamask Is Connected" : "Connect to MetaMask"}</button>
      </div>
    </div>
  );
};

export default Navbar;
