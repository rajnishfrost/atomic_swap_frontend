import React, { useState, useEffect } from 'react';
import "./newContract.css";
import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker  } from '@mui/x-date-pickers';
import { useSelector, useDispatch } from 'react-redux';
import { network, new_contract } from "../../API/network.js";


export default function NewContract() {
    const [value, setValue] = useState(null);
    const getNetwork = useSelector((state) => state.network.network);
    const dispatch = useDispatch();
    const [timestamp , setTimestamp] = useState(0)

    useEffect(() => {
        network(dispatch);
        if(value !== undefined){
            const mainValue = value?.$d
            let seconds = dayjs(mainValue).unix()
            setTimestamp(seconds)
        }
    }, [value , dispatch]);

   
    return (
        <div className='mainDiv'>
            <div className='box mt-10'>
                <h4 className='text-black text-center'>Sign New Contract{timestamp}</h4>
                <div className='d-flex justify-center'>
                    <input className='input' type="number" placeholder='Enter Coin You Exchange' />
                    <select name="" id="" onChange={(e) => console.log(e.target.value)}>
                        {
                            getNetwork && getNetwork.data &&getNetwork?.data?.map((d, i) =>
                                <option value={d} key={i}>{d.name}</option>
                            )
                        }
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
                    <input className='input' type="text" placeholder='Enter Password' />
                </div>
                <div className='d-flex justify-center mt-10 '>
                    <input className='input' type="text" placeholder='To Address' />
                </div>
                <div className='d-flex justify-center mt-10 '>
                    <button onClick={() => new_contract()}>Sign Transaction</button>
                </div>
            </div>
        </div>
    )
}
