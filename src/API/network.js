import axios from 'axios';
import { save } from '../Redux/networkSlice';

export const network = async (dispatch) => {
 const data = await axios.get(`${process.env.REACT_APP_BACKEND_URI}blockchain-transaction/network`);
 dispatch(save(data.data))
}

export const new_contract = async (payload) => {
    return await axios.post(`${process.env.REACT_APP_BACKEND_URI}blockchain-transaction/network`, payload);
}

