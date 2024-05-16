import React, { useEffect } from 'react'
import Navbar from '../../Common Comp/Navbar/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { getTrasanction } from '../../API/network';
import "./transaction.css"
import formatDate from "../../utils/formate"
export default function Transaction() {
  const getTransaction = useSelector((state) => state.network.trasanction);
  const dispatch = useDispatch()
  console.log(getTransaction);

  useEffect(() => {
    getTrasanction(dispatch);
    // eslint-disable-next-line
  }, [])



  const tableRows = getTransaction?.map((row, index) => {
    return(
      <tr key={index}>
        <td>{row?.transaction?.contract_data?.blockNumber}</td>
        <td>{row?.transaction?.contract_data?.blockHash}</td>
        <td>{row?.transaction?.chainID}</td>
        <td>{formatDate(row?.createdAt)}</td>
      </tr>
    )
  });

  return (
    <div>
      <Navbar />
      <div className='d-flex justify-center mt-10'>
        <table>
          <thead>
            <tr>
              <th>Block Number</th>
              <th>Block Hash</th>
              <th>Chain ID</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {tableRows}
          </tbody>
        </table>
      </div>
    </div>
  )
}
