import React, { useEffect, useState } from 'react'
import "./home.css"
import { FaBeer, FaGraduationCap, FaUser, FaUserCheck } from 'react-icons/fa'
import apiurl from '../services/api'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Home = () => {

  const [students, setStudents] = useState([])

const navigate = useNavigate()

  const getStudents = async () => {
    try {
      const response = await axios.get(apiurl);

      console.log(response.data);

      setStudents(response.data);

    } catch (error) {
      console.log("Error fetching data:", error);
    } 
  }

  const activeStudents = students.filter((student) => 
    student.status === "Active"
  );

  const courses = [...new Set(students.map((student)=> student.course))]
  
const courseCount = students.reduce((result, student) => {
  result[student.course] = (result[student.course] || 0) + 1;
  return result;
}, {});

console.log(courseCount);


const recentStudents = [...students]
  .sort(
    (a, b) =>
      new Date(b.enrollmentDate) - new Date(a.enrollmentDate)
  )
  .slice(0, 4);

  useEffect(()=>{
    getStudents()
  },[])

  return (
    <>
      <div className='container'>

        <div className='heroSection roundedCorner'>
          <h1>
            Welcome to Student Hub!
          </h1>
          <h3>Manage your students effeciently and easily.</h3>
          <button onClick={()=> navigate('./addstudent')}>
            + Add new Student
          </button>
        </div>

        <div className='cardsSection numCards'>

          <div className='numcard' style={{backgroundColor:"aqua"}}>
            <div className='cardHead'>
              <FaUser /> <h3>Total Students</h3>
            </div>
            <div className='cardBody'>
              <strong>{students.length}</strong>
            </div>
          </div>

          <div className='numcard' style={{backgroundColor:"lightgreen"}}>
            <div className='cardHead'>
              <FaUserCheck /> <h3>Active Students</h3>
            </div>
            <div className='cardBody'>
              <strong>{activeStudents.length}</strong>
            </div>
          </div>

          <div className='numcard' style={{backgroundColor:"lightgray"}}>
            <div className='cardHead'>
              <FaUser/> <h3>Inactive Students</h3>
            </div>
            <div className='cardBody'>
              <strong>{students.length - activeStudents.length}</strong>
            </div>
          </div>

          <div className='numcard' style={{backgroundColor:"skyblue"}}>
            <div className='cardHead'>
              <FaGraduationCap/> <h3>Total Courses</h3>
            </div>
            <div className='cardBody'>
              <strong>{courses.length}</strong>
            </div>
          </div>

        </div>

        <div className='cardsRow'>
          <div className='cardCol'>
              <div className='courses'>
              <h2>Course Distribution</h2>
              <ul>
                {Object.entries(courseCount).map(([course, count]) => (
  <li key={course}>
    {course} : {count}
  </li>
))}
              </ul>
              </div>
          </div>

<div className='cardCol'>
  <div className='recentStudents'>
    <h2>Recent Students</h2>

    {recentStudents.map((student) => (
  <div key={student.id} className='studentRecords'>
    <h3>{student.name}</h3>
    <p>{student.course}</p>
    <span className='status'>{student.status}</span>
  </div>
))}

  </div>
</div>

        </div>

      </div>
    </>
  )
}

export default Home