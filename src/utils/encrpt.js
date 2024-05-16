import CryptoJS from 'crypto-js';

export const encrypt = (str) => {
    return CryptoJS.AES.encrypt(str, process.env.REACT_APP_PK).toString();
}