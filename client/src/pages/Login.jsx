import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Login = () => {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const navigate=useNavigate()

    const handleSbmit=(e)=>{
        e.preventDefault();
        let obj={
            email,password
        }
        // console.log(obj)
        axios.post(`https://reqres.in/api/login`,obj)
        .then((res)=>{
            console.log(res.data.token)
            localStorage.setItem('token',res.data.token)
            navigate('/board')
        })
        .catch((err)=>{
            console.log(err)
        })
    }
  return (
    <DIV>
      <form onSubmit={handleSbmit}>
        <FormControl>
          <FormLabel>Email address</FormLabel>
          <Input type="email" value={email}  onChange={(e)=>setEmail(e.target.value)}/>
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input type="password"  value={password} onChange={(e)=>setPassword(e.target.value)}/>
        </FormControl>
        <FormControl>
          <Input type="submit" value='Login now' _hover={{fontWeight:"bold",cursor:"pointer",backgroundColor:'gray'}} />
        </FormControl>
      </form>
    </DIV>
  );
};

export default Login;

const DIV=styled.div`
width: 40%;
margin: auto;
background-color: white;
color: black;
padding: 2%;
border-radius: 15px;
box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
margin-top: 40px;
input{
    margin-bottom: 20px;
}
`