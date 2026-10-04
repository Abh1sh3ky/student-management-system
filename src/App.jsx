import axios from 'axios'
import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Students from './pages/Students'
import StudentDetails from './pages/StudentDetails'
import AddStudent from './pages/AddStudent'
import EditStudent from './pages/EditStudent'

const App = () => {
  

  return (
    <>
    
      <BrowserRouter>
      <Navbar />
        <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/students' element={<Students />} />
        <Route path='/student/:id' element={<StudentDetails />} />
        <Route path='/addstudent' element={<AddStudent />} />
        <Route path='/editstudent/:id' element={<EditStudent />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App