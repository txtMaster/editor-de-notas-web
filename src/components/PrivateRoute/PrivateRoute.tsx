import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/useAuth'

type Props = {
    children?: React.ReactNode
}

export const PrivateRoute = ({
    children=null
}:Props) => {
    const {isAuthenticated} = useAuth();
    return isAuthenticated ? children : (<Navigate to={"/"} replace/>)
}
