import React, { useState } from 'react'
import {Textarea } from '@chakra-ui/react'
import axios from 'axios';
import styled from "styled-components"
import { Text } from '@chakra-ui/react'

export const CreateNotes = () => {

    const [title, setTitle] = useState("")
    const [note, setNote] = useState("")
    const [category, setCategory] = useState("")
    const [author, setAuthor] = useState("")

    const token = localStorage.getItem("token")

    const formHandler = (e)=>{

        e.preventDefault()

        let data = {
            title,
            note, 
            category,
            author,
        }


        console.log(data)
        axios.post("http://localhost:7000/note/create", data, {
            headers: {
                Authorization: `Bearer ${token}`
              }
        })
        .then((res)=>{
            console.log(res)
        })

        setAuthor("")
        setTitle("")
        setCategory("")
        setNote("")
    }

    

  return (
    <>
    <Text fontSize='2xl' style={{textAlign: "center", marginTop: "100px"}}>Create Your Notes </Text>

    <DIV>
       <form action="" onSubmit={formHandler} style={{display: "flex", flexDirection:"column", width: "12%"}}>
        <input type="text" placeholder='Title' className='inp'
        onChange={(e)=>{ setTitle(e.target.value)}} value={title}/>
        <Textarea
        placeholder='Enter Your Notes Here'
        size='sm'
        className='textArea'
        onChange={(e)=>{ setNote(e.target.value)}} value={note}
      />
      <input type="text" placeholder='category' className='inp'
      onChange={(e)=>{ setCategory(e.target.value)}} value={category} />

      <input type="text" placeholder='author' className='inp'
      onChange={(e)=>{ setAuthor(e.target.value)}} value={author}/>

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

input{
  margin-bottom: 10px;
}

.textArea{
  margin-bottom: 10px;
}

.inp{
  background-color: #f4f2f2;
  padding: 5px;
}
  
`
