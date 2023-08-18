import React, { useState } from 'react'
import { createContext } from 'react'

export const AppContent = createContext()

export const ContextApi = ({children}) => {

    const [isAuth, setIsAuth] = useState(false)


  return (
    <AppContent.Provider value={{isAuth, setIsAuth}}>{children}</AppContent.Provider>
  )
}
