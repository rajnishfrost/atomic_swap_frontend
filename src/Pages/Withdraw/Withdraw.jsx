import React, { useEffect, useState } from 'react'
import Navbar from '../../Common Comp/Navbar/Navbar'
import { useSelector } from 'react-redux';
import {withdraw} from "../../API/blockchainTransaction"
import { encrypt } from '../../utils/encrpt';

export default function Withdraw() {
  const [payload, setPayload] = useState({});
  // const [error, setError] = useState("");
  const getNetwork = useSelector((state) => state.network.network);
  const from = useSelector((state) => state.network.from);

  const handleInput = (e) => {
    const { name, value } = e.target;
    if(name === "pk"){
      const ciphertext = encrypt(value);
      return setPayload({ ...payload, [name]: ciphertext });
  }
    setPayload({ ...payload, [name]: String(value) })
  }

  const handleSelect = (data) => {
    const { chainID, rpc } = data;
    setPayload({ ...payload, chainID: String(chainID), rpc })
  }

  useEffect(() => {
    setPayload({ ...payload, from });
    // eslint-disable-next-line
  }, [from])

  const handleSign = () => {
    withdraw(payload);
  }

  console.log(payload);
  return (
    <div>
      <Navbar />
      <div style={{ height: "80vh" }} className='d-flex justify-center align-item-center'>
        <div>
          <div className='d-flex justify-between mt-10 '>
            <input name='contractID' className='input' type="text" placeholder='Contract ID' onChange={(e) => handleInput(e)} />
            <select name="" id="" onChange={(e) => { handleSelect(JSON.parse(e.target.value)) }}>
              <option value="">Select</option>
              {getNetwork && getNetwork.data && getNetwork.data.map((d, i) =>
                <option value={JSON.stringify(d)} key={i}>{d.name}</option>
              )}
            </select>
          </div>
          <div>
            <input className='input mt-10' type="text" placeholder='secret' name="secret" onChange={(e) => handleInput(e)} />
            <input className='input mt-10' type="text" placeholder='Private Key' name='pk' onChange={(e) => handleInput(e)} />
          </div>
          <div className='d-flex justify-center mt-10 '>
            <button onClick={() => handleSign()}>Sign Transaction</button>
          </div>
        </div>
      </div>
    </div>
  )
}
