import React, { useState } from 'react'
import { loginAPI } from '../../API/auth';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [input, setInput] = useState({});
  const [error, setError] = useState("")
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const inputChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value })
  }

  const onSubmit = async () => {
    const response = await loginAPI(dispatch, navigate, input);
    console.log(response);
    if (response === 401)
      setError("Not Matched")
  }
  return (
    <div>
      <div className='d-flex justify-center' style={{ "align-items": "center", height: "100vh" }}>
        <div>
          <input className='d-block mt-10' type="email" placeholder='E-mail' name="email" onChange={(e) => inputChange(e)} style={{ width: "300px", height: "30px", padding: "3px" }} />
          <input className='mt-10 d-block' type="password" placeholder='Password' name="password" onChange={(e) => inputChange(e)} style={{ width: "300px", height: "30px", padding: "3px" }} />
          <div className='d-flex justify-center'>
            <button onClick={() => onSubmit()} className='mt-10 d-block'>Sign In</button>
          </div>
          <p className='text-center'><Link to="/sign-up" >Don't Have Account</Link></p>
          <p className='text-center color-red' style={{ fontSize: "13px", height: "5px" }}>{error}</p>
        </div>
      </div>
    </div>
  )
}
