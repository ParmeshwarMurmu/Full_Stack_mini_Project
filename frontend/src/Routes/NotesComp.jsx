import React, { useState } from 'react'
import { Text, Textarea } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import axios from 'axios'

export const NotesComp = ({ title, note, category, author, _id, setState }) => {

    const token = localStorage.getItem('token')

    const deleteHandler = () => {

        axios.delete(`http://localhost:7000/note/delete/${_id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                console.log("Document deleted:", res.data);
                setState(2)
            })
            .catch((error) => {
                console.error("Error deleting document:", error);
            });

    }

    return (
        <>
            <Text fontSize='2xl'>Title : {title}</Text>
            <Text fontSize='2xl'>Note : {note}</Text>
            <Text fontSize='2xl'>Category : {category}</Text>
            <Text fontSize='2xl'>Author : {author}</Text>

            <div style={{ marginBottom: "20px" }}>
                <Button colorScheme='blue' size={'sm'} style={{ marginRight: "10px" }} >Edit</Button>
                <Button colorScheme='blue' size={'sm'} onClick={deleteHandler}>Delete</Button>

            </div>

           
        </>
    )
}
