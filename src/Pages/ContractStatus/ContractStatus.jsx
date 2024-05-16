import React, { useEffect, useState } from 'react'
import Navbar from '../../Common Comp/Navbar/Navbar';
import '../NewContract/newContract.css';
import { useSelector } from 'react-redux';
import { getContract } from '../../API/blockchainTransaction';
import { formatTimestamp } from '../../utils/formatTimestamp';

export default function ContractStatus() {
  const [payload, setPayload] = useState({});
  const getNetwork = useSelector((state) => state.network.network);
  const [error, setError] = useState(false);
  const [blockData, setBlockData] = useState({});
  const from = useSelector((state) => state.network.from);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setPayload({ ...payload, [name]: String(value) })
  }

  const handleSelect = (data) => {
    const { chainID } = data;
    setPayload({ ...payload, chainID: String(chainID) })
  }

  const getBlock = async () => {
    try {
      const data = await getContract(payload);
      const { amount, receiver, sender, refunded, timelock, withdrawn } = data.data;
      setBlockData({ amount: amount / 1000000000000000000 , refunded : String(refunded) , timelock : formatTimestamp(timelock), withdrawn : String(withdrawn), receiver, sender });
      setError(false);
    } catch (error) {
      console.log(error);
      setError(true);
    }
  }

  useEffect(() => {
    setPayload({ ...payload, from });
    // eslint-disable-next-line
  }, [from])


  console.log(payload);
  return (
    <div>
      <Navbar />
      <div className='d-flex justify-center align-item-center' style={{ height: "40vh" }}>
        <div>
          <div className='d-flex justify-center mt-10 '>
            <input name='contract_address' className='input' type="text" placeholder='Contract ID' onChange={(e) => handleInput(e)} />
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
              <th>Sender</th>
              <th>Receiver</th>
              <th>Refunded</th>
              <th>Withdrawn</th>
              <th>Timelock</th>
            </tr>
          </thead>
          <tbody>
            <tr >
              <td>{blockData?.amount}</td>
              <td>{blockData?.sender}</td>
              <td>{blockData?.receiver}</td>
              <td>{blockData?.refunded }</td>
              <td>{blockData?.withdrawn }</td>
              <td>{blockData?.timelock}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className='text-center color-red'>{error ? "Something Went Wrong" : <></>}</p>

    </div>
  )
}
