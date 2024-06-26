import React, { useState } from 'react'
import Navbar from '../../Common Comp/Navbar/Navbar';
import '../NewContract/newContract.css';
import { useSelector } from 'react-redux';
import { getEventByBlockNumber } from '../../API/blockchainTransaction';
import { formatTimestamp } from "../../utils/formatTimestamp"

export default function GetBlock() {
  const [payload, setPayload] = useState({});
  const getNetwork = useSelector((state) => state.network.network);
  const [error, setError] = useState(false);
  const [blockData, setBlockData] = useState({})

  const handleInput = (e) => {
    const { name, value } = e.target;
    setPayload({ ...payload, [name]: String(value) })
  }

  const handleSelect = (data) => {
    const { rpc, chainID } = data;
    setPayload({ ...payload, rpc, chainID: String(chainID) })
  }

  const getBlock = async () => {
    try {
      const data = await getEventByBlockNumber(payload);
      const { amount, contractId, timelock, receiver, sender } = data.data.returnValues;
      setBlockData({ amount : amount / 1000000000000000000, contractId, timelock : formatTimestamp(timelock), receiver, sender });
      setError(false);
    } catch (error) {
      console.log(error);
      setError(true);
    }
  }
  
  return (
    <div>
      <Navbar />
      <div className='d-flex justify-center align-item-center' style={{ height: "40vh" }}>
        <div>
          <div className='d-flex justify-center mt-10 '>
            <input name='bn' className='input' type="number" placeholder='Enter Block Number' onChange={(e) => handleInput(e)} />
            <select name="" id="" onChange={(e) => { handleSelect(JSON.parse(e.target.value)) }}>
              <option value="">Select</option>
              {getNetwork && getNetwork.data && getNetwork.data.map((d, i) =>
                <option value={JSON.stringify(d)} key={i}>{d.name}</option>
              )}
            </select>
          </div>
          <div className='d-flex justify-center mt-10'>
            <button onClick={() => getBlock()}>Get</button>
          </div>
        </div>
      </div>
      <div className='d-flex justify-center mt-10'>
        <table>
          <thead>
            <tr>
              <th>Amount</th>
              <th>Contract ID</th>
              {/* <th>Receiver</th>
                  <th>Sender</th> */}
              <th>Timelock</th>
            </tr>
          </thead>
          <tbody>
            <tr >
              <td>{blockData?.amount}</td>
              <td>{blockData?.contractId}</td>
              {/* <td>{blockData?.receiver}</td>
                  <td>{blockData?.sender}</td> */}
              <td>{blockData?.timelock}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className='text-center color-red'>{error ? "Something Went Wrong" : <></>}</p>

    </div>
  )
}
