import React, { useEffect, useState } from 'react'
import apiurl from '../services/api'
import axios from 'axios'
import './students.css'
import { useNavigate } from 'react-router-dom'
import DeleteModal from '../components/DeleteModal'

const Students = () => {

  const [students, setStudents] = useState([])

  const [loading, setLoading] = useState(true)

  const [search, setSearch] = useState("");

  const getStudents = async () => {
    try {
      const response = await axios.get(apiurl);

      console.log(response.data);

      setStudents(response.data);

    } catch (error) {
      console.log("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }

  const navigate = useNavigate()

  const handleView = (id) => {
    console.log("id:", id);
    navigate(`/student/${id}`)

  }

  useEffect(() => {
    getStudents()
  }, [])

  // if(loading){
  //   return <h2>Loading ...</h2>
  // }
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${apiurl}/${deleteId}`);
      setStudents((students) =>
        students.filter((student) => student.id !== deleteId)
      );
      setShowDeleteModal(false);
      setDeleteId(null);
    }
    catch (error) {
      console.log("Error deleting student:", error);
    }
  };

  // const filteredStudents = students.filter((student) => (
  //   student.name.toLowerCase().includes(search.toLowerCase())
  // ))

  const courses = [...new Set(students.map(student => student.course))];

  const [selectedCourse, setSelectedCourse] = useState("");

  const filteredStudents = students.filter((student) => {
    const matchName = student.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchCourse =
      selectedCourse === "" || student.course === selectedCourse;

    return matchName && matchCourse;
  });


  return (
    <>


      <div className='container'>
        <div className='pageHeader'>
          <div className='leftSection'>
            <h1>Students</h1>
            <p>Manage all student records</p>
          </div>
          <div className='rightSection'>
            <button onClick={() => navigate('/addstudent')}> + Add Student</button>
          </div>
        </div>

        <div className='filters'>
          <div className='searchContainer'>
            <input type="text" onChange={(e) =>
              setSearch(e.target.value)
            } name='search' value={search} placeholder='Search Student by name' />
          </div>
          <div className='filterbyCourse'>
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
            >
              <option value="">All Courses</option>

              {courses.map((course) => (
                <option key={course} value={course}>
                  {course}
                </option>
              ))}
            </select>
          </div>
        </div>

        {
          loading ?

            <h2>Loading ...</h2>
            :
            (
              <div className='pageBody'>
                {
                  filteredStudents.length > 0 ? (
                    <div className='tableWrapper'>
                      <table>
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Course</th>
                            <th>Status</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>

                          {
                            filteredStudents.map((student) => (
                              <tr key={student.id}>
                                <td>{student.id}</td>
                                <td>{student.name}</td>
                                <td>{student.email}</td>
                                <td>{student.course}</td>
                                <td><span className='status'>{student.status}</span></td>
                                <td>
                                  <button onClick={() => { handleView(`${student.id}`) }
                                  }>View</button>
                                  <button className='editBtn' onClick={() =>
                                    navigate(`/editstudent/${student.id}`)
                                  }
                                  >Edit</button>
                                  <button className='delBtn' onClick={() => { handleDeleteClick(student.id) }
                                  }>
                                    Delete</button>
                                </td>
                              </tr>
                            ))

                          }


                        </tbody>
                      </table>
                    </div>
                  )
                    :
                    (
                      <div className='noRecords'>
                        <h2>No students found!</h2>
                        <p>Start by adding that student.</p>
                        <button onClick={() => navigate('/addstudent')}> + Add Student</button>
                      </div>
                    )
                }

              </div>
            )
        }
      </div>

      {showDeleteModal && (
        <DeleteModal
          closeModal={() => {
            setShowDeleteModal(false);
            setDeleteId(null);
          }}
          confirmDelete={handleDelete}
        />
      )}

    </>
  )
}

export default Students