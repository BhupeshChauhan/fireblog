import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../Pages/Login'
import Signup from '../Pages/SignUp'

const UnAuthRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Signup />}/>
    </Routes>
  )
}

export default UnAuthRoutes