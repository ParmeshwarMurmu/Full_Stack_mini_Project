import React from 'react'
import { AppContent } from '../Context/ContextApi'
import { useContext } from 'react'
import { Navigate } from 'react-router-dom'

export const PrivateRoute = ({children}) => {

    const {isAuth} = useContext(AppContent)

    if(isAuth){
        return children
    }
    else{
        return <Navigate to={"/login"}/>
    }
}
