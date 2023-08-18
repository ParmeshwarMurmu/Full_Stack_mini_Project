import React, { useState } from 'react'
import axios from "axios"
import { AppContent } from '../Context/ContextApi'
import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import styled from "styled-components"
import { Text } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'

export const Login = () => {

  const {isAuth, setIsAuth} = useContext(AppContent)


  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")

  const formHandler = (e)=>{
    e.preventDefault()

    let data = {
        userName,
        password

    }

    console.log(data)

    axios.post("http://localhost:7000/user/login", data)
    .then((res)=>{
        console.log(res)
        localStorage.setItem("token", res.data.token)
        localStorage.setItem("userId", res.data.userId)
        setIsAuth(true);
        <Navigate to={"/notes"} />
    })
    .catch((err)=>{
      console.log(err);
    })

    setUserName("")
    setPassword("")


}

const logoutHandler = ()=>{
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  setIsAuth(false)
  
}

  return (

    <>
     {
      isAuth === false ? <Text fontSize='2xl' style={{textAlign: "center", marginTop: "100px"}}>To acces your notes Please login if Already registered</Text> : ""
     }

    <DIV>
     

     {
      isAuth ?   <Button colorScheme='blue' size={'sm'} onClick={logoutHandler}>Logout</Button>    : <div className='formDiv'> <form action="" onSubmit={formHandler}>
      <input type="text" placeholder='userName' value={userName} onChange={(e) => {
        setUserName(e.target.value)
      }} />
      
      <input type="password" placeholder='Password' value={password} onChange={(e) => {
        setPassword(e.target.value)
      }} />
    

      <input type="submit" />
    </form>
    </div>
     }
    </DIV>

    </>
  )
}


const DIV = styled.div`
 
 display: flex;
 justify-content: center;
 margin-top: 50px;
  
  .formDiv{
    display: flex;
    flex-direction: column;
    width:12%;
  }

  input{
    background-color: #f4f2f2;
    margin-bottom: 10px;
    padding: 5px;
  }
`
