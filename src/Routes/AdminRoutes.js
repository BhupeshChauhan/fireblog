import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminDashboard from '../Pages/Admin/AdminDashboard'
import AdminLayout from '../Layout/Admin/AdminLayout'
import UserLayout from '../Layout/Admin/UserLayout'
import Home from '../Pages/User/Home'
import UserData from '../Pages/Admin/UserData'
import BlogData from '../Pages/Admin/BlogData'
import BlogSettings from '../Pages/Admin/BlogSettings'
import Media from '../Pages/Admin/Media'
import Featured from '../Pages/User/Featured'
import Categories from '../Pages/User/Categories'
import SingleBlog from '../Pages/User/SingleBlog'

const AdminRoutes = () => {
  return (
    <Routes>
        <Route 
            path="/"
            element={
                <UserLayout>
                    <Home />
                </UserLayout>
            }
        />
        <Route 
            path="/Featured"
            element={
                <UserLayout>
                    <Featured />
                </UserLayout>
            }
        />
        <Route 
            path="/Categories"
            element={
                <UserLayout>
                    <Categories />
                </UserLayout>
            }
        />
        <Route 
            path="/Blog/:id"
            element={
                <UserLayout>
                    <SingleBlog />
                </UserLayout>
            }
        />
        <Route 
            path="/Dashboard"
            element={
                <AdminLayout>
                    <AdminDashboard />
                </AdminLayout>
            }
        />
        <Route 
            path="/userdata"
            element={
                <AdminLayout>
                    <UserData />
                </AdminLayout>
            }
        />
        <Route 
            path="/blogdata"
            element={
                <AdminLayout>
                    <BlogData />
                </AdminLayout>
            }
        />
        <Route 
            path="/blogsettings"
            element={
                <AdminLayout>
                    <BlogSettings />
                </AdminLayout>
            }
        />
        <Route 
            path="/media"
            element={
                <AdminLayout>
                    <Media />
                </AdminLayout>
            }
        />
    </Routes>
  )
}

export default AdminRoutes