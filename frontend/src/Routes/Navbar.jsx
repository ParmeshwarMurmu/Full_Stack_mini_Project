import React from 'react'
import { Link } from 'react-router-dom'

export const Navbar = () => {
  return (
    <div style={{display:"flex", justifyContent: "space-around"}}>
        <Link to={"/notes"}>My Notes</Link>
        <Link to={"/create"}>Create Notes</Link>
        <Link to={"/login"}>Login</Link>
        <Link to={"/signup"}>Register</Link>
    </div>
  )
}
