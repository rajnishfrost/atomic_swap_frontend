import React, { useState, useEffect } from 'react';
import "./newContract.css";
import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers';
import { useSelector, useDispatch } from 'react-redux';
import { network, new_contract } from "../../API/network.js";
import Navbar from "../../Common Comp/Navbar/Navbar";
import { encrypt } from '../../utils/encrpt.js';


export default function NewContract() {
    const [value, setValue] = useState(null);
    const getNetwork = useSelector((state) => state.network.network);
    const from = useSelector((state) => state.network.from);
    const dispatch = useDispatch();
    const [timestamp, setTimestamp] = useState(0);
    const [payload, setPayload] = useState({});
    const [success , setSuccess] = useState("")

    useEffect(() => {
        network(dispatch);
        if (value !== undefined) {
            const mainValue = value?.$d
            let seconds = dayjs(mainValue).unix()
            setTimestamp(seconds)
        }
    }, [value, dispatch]);

    const handleSelect = (data) => {
        const { rpc, chainID } = data;
        setPayload({ ...payload, rpc, chainID : String(chainID) })
    }

    const handleInput = (e) => {
        const { name, value } = e.target;
        if(name === "pk"){
            const ciphertext = encrypt(value);
            return setPayload({ ...payload, [name]: ciphertext });
        }
        setPayload({ ...payload, [name]: value })
    }

    const handleContract = async () => {
        const response = await new_contract(payload);
        if(response === 400)
            setSuccess("Something Went Wrong")
        else
        setSuccess("Go to transaction get to get block number")
    }

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("Atomic_Swap"));
        const { email } = data.decodedToken;
        setPayload({ ...payload, email, from })
        // eslint-disable-next-line
    }, [from]);

    useEffect(() => {
        setPayload({ ...payload, time: String(timestamp) });
        // eslint-disable-next-line
    }, [timestamp])

    console.log(payload);

    return (
        <div>
            <Navbar />
            <div className='mainDiv'>
                <div className='box mt-10'>
                    <h4 className='text-black text-center'>Sign New Contract</h4>
                    <div className='d-flex justify-center'>
                        <input name="coins" className='input' type="number" placeholder='eg 1.0 ether' onChange={(e) => handleInput(e)} />
                        <select name="" id="" onChange={(e) => { handleSelect(JSON.parse(e.target.value)) }}>
                            <option value="">Select</option>
                            {getNetwork && getNetwork.data && getNetwork.data.map((d, i) =>
                                <option value={JSON.stringify(d)} key={i}>{d.name}</option>
                            )}
                        </select>
                    </div>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Stack spacing={2} mt={1}  >
                            <DateTimePicker
                                value={value}
                                onChange={setValue}
                                referenceDate={dayjs()}
                                minDateTime={dayjs()}
                            />
                        </Stack>
                    </LocalizationProvider>
                    <div className='d-flex justify-center mt-10 '>
                        <input name='pass' className='input' type="text" placeholder='Enter Secret' onChange={(e) => handleInput(e)} />
                    </div>
                    <div className='d-flex justify-center mt-10 '>
                        <input name="to" className='input' type="text" placeholder='To Address' onChange={(e) => handleInput(e)} />
                    </div>
                    <div className='d-flex justify-center mt-10 '>
                        <input name="pk" className='input' type="text" placeholder='Private Key' onChange={(e) => handleInput(e)} />
                    </div>
                    <div className='d-flex justify-center mt-10 '>
                        <button onClick={() => handleContract()}>Sign Transaction</button>
                    </div>
                    <p className='text-center'>{success}</p>
                </div>
            </div>
        </div>
    )
}
