import axios from 'axios';
import { save, saveTransaction } from '../Redux/networkSlice';

export const network = async (dispatch) => {
 const data = await axios.get(`${process.env.REACT_APP_BACKEND_URI}blockchain-transaction/network`);
 dispatch(save(data.data))
}

export const new_contract = async (payload) => {
    try {
        const token = JSON.parse(localStorage.getItem("Atomic_Swap"));
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token.token}`
        };
        await axios.post(`${process.env.REACT_APP_BACKEND_URI}blockchain-transaction/new-contract`, payload , headers);
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
    const data = await axios.get(`${process.env.REACT_APP_BACKEND_URI}blockchain-transaction/transaction`,dispatch, headers);
    dispatch(saveTransaction(data.data.data))
   }

