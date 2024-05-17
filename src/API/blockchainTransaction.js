import axios from "axios";
import { saveTransaction } from '../Redux/networkSlice';

export const new_contract = async (payload) => {
    try {
        const token = JSON.parse(localStorage.getItem("Atomic_Swap"));
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token.token}`
        };
        await axios.post(`${process.env.REACT_APP_BACKEND_URI}blockchain-transaction/new-contract`, payload, headers);
        return 200
    } catch (error) {
        console.log(error);
        return 400
    }
}

export const getTrasanction = async (dispatch) => {
    const token = JSON.parse(localStorage.getItem("Atomic_Swap"));
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token.token}`
    };
    const data = await axios.get(`${process.env.REACT_APP_BACKEND_URI}blockchain-transaction/transaction`, dispatch, headers);
    dispatch(saveTransaction(data.data.data))
}

export const getEventByBlockNumber = async (payload) => {
    const headers = {
        'Content-Type': 'application/json',
    };
    return await axios.post(`${process.env.REACT_APP_BACKEND_URI}blockchain-transaction/get-event-by-Block`, payload, headers);
}

export const getContract = async (payload) => {
    const headers = {
        'Content-Type': 'application/json',
    };
    return await axios.post(`${process.env.REACT_APP_BACKEND_URI}blockchain-transaction/get-contract`, payload, headers);
}

export const withdraw = async (payload) => {
    const token = JSON.parse(localStorage.getItem("Atomic_Swap"));
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token.token}`
    };
    return await axios.post(`${process.env.REACT_APP_BACKEND_URI}blockchain-transaction/withdraw`, payload, headers);
}