import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export default function PublicRoute({ isAuthenticated }) {
    if (isAuthenticated)
        return <Navigate to={"/"} />
    return <Outlet />
}
