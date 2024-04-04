import React, { useState } from 'react'
import "./J.css"
import logo from "../../images/logo.png";
import { Link } from 'react-router-dom';


let user;
const sendUser = ()=>{
    user=document.getElementById('joinInput').value
    document.getElementById('joinInput').value=""
}

function J() {
  
    const [name,setName] = useState("")
    
  return (
    <div className='JoinPage'>
        <div className='JoinContainer'>
            <img src={logo} alt="logo" />
        <h1>Chat</h1>
        <input onChange={(e)=>setName(e.target.value)} type="text" id='joinInput' placeholder='Enter Your Name' />
        <Link onClick={(event)=> !name ? event.preventDefault() : null} to="/chat"><button className='joinbtn' onClick={sendUser}>Login</button></Link>
        
    </div>

    </div>
  )
}

export default J;
export {user};