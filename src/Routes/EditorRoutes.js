import React from 'react'
import { Route, Routes } from 'react-router-dom'
import EditorDashboard from '../Pages/Editor/EditorDashboard'

const EditorRoutes = () => {
  return (
    <Routes>
        <Route 
            path="/"
            element={
                <EditorDashboard />
            }
        />
    </Routes>
  )
}

export default EditorRoutes