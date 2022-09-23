import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

const PrivateRouteUser = () => {
  const get_role = localStorage.getItem('role')
  const role = ('role: ', JSON.parse(get_role))

  const test = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    <Navigate to='/login' /> 
  }

  return (
    role.role === 'User' ? <Outlet /> : test

  )
}

export default PrivateRouteUser