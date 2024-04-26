import React from 'react'
import HeaderComponent from '../../components/IncludeHomePages/headerPage'
import { Outlet } from 'react-router-dom'
export default function index() {
  return (
    <>
      <HeaderComponent/>
      <Outlet/>
    </>
  )
}
