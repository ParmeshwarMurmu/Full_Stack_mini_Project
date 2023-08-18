import React, { useState } from 'react'
import axios from 'axios'
import styled from "styled-components"
import { Text } from '@chakra-ui/react'


export const Signup = () => {
    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [age, setAge] = useState("")

    const formHandler = (e)=>{
        e.preventDefault()

        let data = {
            userName,
            email,
            password,
            age: +age
        }
        
        console.log(data)
        axios.post("http://localhost:7000/user/register", data)
        .then((res)=>{
            console.log(res)
            localStorage.setItem("userId", res.data._id)
        })

        setUserName("")
        setEmail("")
        setPassword("")
        setAge("")

    }

  return (
    
    <>
      
      <Text fontSize='2xl' style={{textAlign: "center", marginTop: "100px"}}>To Create Your Notes Please register If not Registered</Text>
    <DIV>
        <form action="" onSubmit={formHandler}>
            <input type="text" placeholder='userName' value={userName} onChange={(e)=>{
                setUserName(e.target.value)
            }} />
            <input type="email" placeholder='Email' value={email} onChange={(e)=>{
                setEmail(e.target.value)
            }} />
            <input type="password" placeholder='Password' value={password} onChange={(e)=>{
                setPassword(e.target.value)
            }} />
            <input type="number" placeholder='Age' value={age} onChange={(e)=>{
                setAge(e.target.value)
            }} />

            <input type="submit" />
        </form>
    </DIV>

    </>
  )
}

const DIV = styled.div`
     
 display: flex;
 justify-content: center;
 margin-top: 50px;
  
 form{
    flex-direction: column;
    width: 12%;
 }
  input{
    background-color: #f4f2f2;
    margin-bottom: 10px;
    padding: 5px;
  }
`
