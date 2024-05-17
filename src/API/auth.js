import axios from "axios";
import { login, logout } from "../Redux/authSlice";
import { jwtDecode } from 'jwt-decode';


export const loginAPI = async (dispatch, navigate, payload) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URI}user/login`, payload);
        const decodedToken = jwtDecode(response.data.token);
        localStorage.setItem('Atomic_Swap', JSON.stringify({ token: response.data.token, decodedToken }));
        dispatch(login());
        navigate("/");
        return 200
    } catch (error) {
        console.log(error);
        return 401
    }
}

export const verifyToken = async (dispatch, navigate) => {
    try {
        const token = JSON.parse(localStorage.getItem("Atomic_Swap"));
        if (!token)
            return
        axios.defaults.headers.common['Authorization'] = `Bearer ${token.token}`;
        await axios.get(`${process.env.REACT_APP_BACKEND_URI}user/verify-token`);
        dispatch(login());
        navigate("/")
    } catch (error) {
        console.log(error);
        localStorage.clear()
        dispatch(logout());
    }
}

export const signupAPI = async (payload) => {
    try {
        await axios.post(`${process.env.REACT_APP_BACKEND_URI}user/signup`, payload);
        return 200
    } catch (error) {
        console.log(error);
        return 401
    }
}

export const profileImageUpload = async (payload) => {
    try {
        const token = JSON.parse(localStorage.getItem("Atomic_Swap"));
        if (!token)
            return
        axios.defaults.headers.common['Authorization'] = `Bearer ${token.token}`;
        await axios.post(`${process.env.REACT_APP_BACKEND_URI}user/profile-image`, payload);
        return 200
    } catch (error) {
        console.log(error);
        return 401
    }
}