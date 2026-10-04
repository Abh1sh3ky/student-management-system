import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './studentdetails.css'
import apiurl from '../services/api'
import axios from 'axios'
import { FaBookOpen, FaCalendar, FaCity, FaEnvelope, FaMale, FaPhone, FaRegUser } from 'react-icons/fa'

const StudentDetails = () => {
  const [student, setStudent] = useState({})

  const {id} = useParams();
  const getStudent = async () =>{
       const response = await axios.get(`http://localhost:3000/students/${id}`);
       setStudent(response.data);
      console.log(response.data);
  }

  const navigate = useNavigate()

  useEffect(()=>{
    getStudent()
  },[id])

  return (
    <>
      <div className='container'>
        <div className='pageHeader'>
          <div className='leftSection'>
          <h1> Student details </h1>
          </div>
          <div className='rightSection'>
            <button onClick={()=> navigate('/students')}> Back to Students</button>
          </div>
        </div>

      <div className='studentDetail'>

      <div className='detailHeader'>
          <figure>
             <FaRegUser style={{fontSize: "70px"}} />
          </figure>
          <div className='nameCourse'>
            <div className='studname'><h2>{student.name}</h2>
            <span className='status'>{student.status}</span>
            </div>
            <div className='course'>
              React Development
            </div>
          </div>
      </div> 

      <div className='otherDetails'>

        <div className='row'>
          <div className='label'><FaEnvelope /> Email</div>
          <div className='value'>{student.email}</div>
        </div>

        <div className='row'>
          <div className='label'><FaPhone /> Phone</div>
          <div className='value'>{student.phone}</div>
        </div>  

        <div className='row'>
          <div className='label'><FaRegUser /> Age</div>
          <div className='value'>{student.age}</div>
        </div>

        <div className='row'>
          <div className='label'><FaMale /> Gender</div>
          <div className='value'>{student.gender}</div>
        </div>

        <div className='row'>
          <div className='label'><FaBookOpen /> Course</div>
          <div className='value'>{student.course}</div>
        </div>

        <div className='row'>
          <div className='label'><FaCity/> City</div>
          <div className='value'>{student.address}</div>
        </div>

        <div className='row'>
          <div className='label'><FaCalendar/> Enrolment Date</div>
          <div className='value'>{student.enrollmentDate}</div>
        </div>

      </div>

      </div>

      </div>
    </>
  )
}

export default StudentDetails