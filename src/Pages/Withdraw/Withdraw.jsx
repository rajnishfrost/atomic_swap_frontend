import React, { useState } from 'react'
import Navbar from '../../Common Comp/Navbar/Navbar'
import { useSelector } from 'react-redux';

export default function Withdraw() {
  const [input, setInput] = useState({});
  // const [error, setError] = useState("");
  const getNetwork = useSelector((state) => state.network.network);


  const inputChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value })
  }

  return (
    <div>
      <Navbar />
      <div style={{height : "80vh"}} className='d-flex justify-center align-item-center'>
        <div>
          <div className='d-flex justify-center'>
            <input className='input' type="text" placeholder='Contract ID' name='contractID' onChange={(e) => inputChange(e)} style={{ width: "230px", height: "30px", padding: "3px" }}/>
            <select name="network" id="" onChange={(e) => inputChange(e)}>
              {
                getNetwork && getNetwork.data && getNetwork?.data?.map((d, i) =>
                  <option value={d} key={i}>{d.name}</option>
                )
              }
            </select>
          </div>
          <input className='mt-10 d-block' type="text" placeholder='secret' name="secret" onChange={(e) => inputChange(e)} style={{ width: "300px", height: "30px", padding: "3px" }} />
        </div>
      </div>
    </div>
  )
}
