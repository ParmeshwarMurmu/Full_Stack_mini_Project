import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { Text } from '@chakra-ui/react'
import { NotesComp } from './NotesComp'
import styled from 'styled-components'

export const Notes = () => {

    const [notes, setNotes] = useState([])
    const [state, setState] = useState("")

    const token = localStorage.getItem("token")
    const userId =  localStorage.getItem("userId")
    // console.log("userid", userId);

    

    useEffect(()=>{
      axios.get("http://localhost:7000/note/", {
        headers: {
          Authorization: `Bearer ${token}`,
          'X-User-Id': userId
        }
      })
      .then((res)=>{
          console.log(res.data.notes)
          setNotes(res.data.notes)
      })
    }, [state])


  return (
    <DIV>
     <Text fontSize='5xl' fontWeight={"bold"} style={{textAlign: "center"}}>My Notes</Text>
     {
      notes.map((el)=>(
       <div key={el._id} className='notesComp'>
         <NotesComp {...el} setState={setState} />
       </div>
      ))
     }
    </DIV>
  )
}


const DIV = styled.div`

.notesComp{
  /* border: 2px solid black; */
  width: 80%;
  margin: auto;
  border-bottom: 2px solid black;
  border-bottom-style: dashed;
  margin-bottom: 20px;
}
  
`