import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Pages/User/Home'

const AuthRoutes = () => {
  return (
    <Routes>
        <Route 
            path="/"
            element={<Home />}
        />
    </Routes>
  )
}

export default AuthRoutes