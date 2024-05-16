import axios from 'axios';
import { save } from '../Redux/networkSlice';

export const network = async (dispatch) => {
 const data = await axios.get(`${process.env.REACT_APP_BACKEND_URI}blockchain-transaction/network`);
 dispatch(save(data.data))
}


