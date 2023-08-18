import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Signup } from './Signup'
import {Notes} from "./Notes"
import { Login } from './Login'
import { CreateNotes } from './CreateNotes'
import { PrivateRoute } from './PrivateRoute'


export const AllRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path='/notes' element={<PrivateRoute><Notes /></PrivateRoute>}/>
            <Route path='/create' element={<PrivateRoute><CreateNotes /></PrivateRoute>}/>
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />}/>
        </Routes>
    </div>
  )
}
