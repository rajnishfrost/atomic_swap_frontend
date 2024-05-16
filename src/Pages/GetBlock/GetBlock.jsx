import React, { useState } from 'react'
import Navbar from '../../Common Comp/Navbar/Navbar';
import '../NewContract/newContract.css';
import { useSelector } from 'react-redux';

export default function GetBlock() {
  const [payload, setPayload] = useState({});
  const getNetwork = useSelector((state) => state.network.network);


  const handleInput = (e) => {
    const { name, value } = e.target;
    setPayload({ ...payload, [name]: value })
  }

  const handleSelect = (data) => {
    const { rpc, chainID } = data;
    setPayload({ ...payload, rpc, chainID: String(chainID) })
  }

  console.log(payload);

  return (
    <div>
      <Navbar />
      <div className='d-flex justify-center align-item-center' style={{ height: "40vh" }}>
        <div>
          <div className='d-flex justify-center mt-10 '>
            <input name='bn' className='input' type="text" placeholder='Enter Block Number' onChange={(e) => handleInput(e)} />
            <select name="" id="" onChange={(e) => { handleSelect(JSON.parse(e.target.value)) }}>
              <option value="">Select</option>
              {getNetwork && getNetwork.data && getNetwork.data.map((d, i) =>
                <option value={JSON.stringify(d)} key={i}>{d.name}</option>
              )}
            </select>
          </div>
          <div className='d-flex justify-center mt-10'>
            <button>Get</button>
          </div>
        </div>
      </div>
    </div>
  )
}
