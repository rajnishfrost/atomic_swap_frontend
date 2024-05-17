import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { signupAPI } from '../../API/auth';

export default function Signup() {
  const [input, setInput] = useState({});
  const [error, setError] = useState("");
  const [signupSuccess, setSignupSuccess] = useState(false);

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value })
  }

  const onSignup = async () => {
    const response = await signupAPI(input);
    setInput({});
    if (response === 401)
      return setError("Email Already Registered");
    else
      setSignupSuccess(true);
  }
  console.log(input);
  return (
    <div>

      {
        signupSuccess
          ?
          <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <h1>Sign Up Successfull Back To <Link to="/log-in">Login</Link> Page</h1>
          </div>
          :
          <div className='d-flex justify-center' style={{ alignItems: "center", height: "100vh" }}>
            <div>
              <div className='d-flex justify-between'>
                <input onChange={(e) => { onInputChange(e) }} value={input.firstname} type="text" placeholder='Firstname' name="firstname" style={{ height: "30px", padding: "3px" }} />
                <input onChange={(e) => { onInputChange(e) }} value={input.lastname} type="text" placeholder='Lastname' name="lastname" style={{ height: "30px", padding: "3px" }} />
              </div>
              <input onChange={(e) => { onInputChange(e) }} value={input.email} className='d-block mt-10' type="email" placeholder='E-mail' name="email" style={{ width: "300px", height: "30px", padding: "3px" }} />
              <input onChange={(e) => { onInputChange(e) }} value={input.password} className='mt-10 d-block' type="password" placeholder='Password' name="password" style={{ width: "300px", height: "30px", padding: "3px" }} />
              <div className='d-flex justify-center'>
                <button className='mt-10 d-block' onClick={() => onSignup()}>Sign Up</button>
              </div>
              <p className='text-center'><Link to="/log-in" >Already Have Account</Link></p>
              <p className='text-center color-red' style={{ fontSize: "13px", height: "5px" }}>{error}</p>
            </div>
          </div>
      }

    </div>
  )
}
