
import React, { useEffect, useState } from 'react';
import './addstudent.css';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';

const AddStudent = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    gender: '',
    course: '',
    city: '',
    address: '',
    enrollmentDate: '',
    status: ''
  });

  const [courses, setCourses] = useState([]);

  const navigate = useNavigate();

  // Get courses from students
  const getCourses = async () => {
    try {
      const response = await axios.get('http://localhost:3000/students');

      // Get unique courses
      const uniqueCourses = [
        ...new Set(
          response.data
            .map((student) => student.course)
            .filter((course) => course)
        )
      ];

      setCourses(uniqueCourses);

    } catch (error) {
      console.log('There is something wrong !!!', error);
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

  // Handle form submit
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:3000/students',
        values
      );

      console.log('Student added:', response.data);

      alert('Student added successfully');

      navigate('/students');

    } catch (error) {
      console.log('There is something wrong !!!', error);
      alert('Student could not be added');
    }
  };

  return (
    <>
      <div className="container formPage">

        <div className="pageHeader">
          <div className="leftSection">
            <h1>Add New Student</h1>
            <p>Fill in the details to add student.</p>
          </div>
        </div>

        <div className="pageBody">

          <form
            className="formContainer"
            onSubmit={handleSubmit}
          >

            {/* Full Name */}
            <div className="formField">
              <label>Full Name*</label>

              <input
                type="text"
                name="name"
                value={values.name}
                onChange={(e) =>
                  setValues({
                    ...values,
                    name: e.target.value
                  })
                }
                required
              />
            </div>

            {/* Email */}
            <div className="formField">
              <label>Email*</label>

              <input
                type="email"
                name="email"
                value={values.email}
                onChange={(e) =>
                  setValues({
                    ...values,
                    email: e.target.value
                  })
                }
                required
              />
            </div>

            {/* Phone */}
            <div className="formField">
              <label>Phone*</label>

              <input
                type="number"
                name="phone"
                value={values.phone}
                onChange={(e) =>
                  setValues({
                    ...values,
                    phone: e.target.value
                  })
                }
                required
              />
            </div>

            {/* Age */}
            <div className="formField">
              <label>Age*</label>

              <input
                type="number"
                name="age"
                value={values.age}
                onChange={(e) =>
                  setValues({
                    ...values,
                    age: e.target.value
                  })
                }
                required
              />
            </div>

            {/* Gender */}
            <div className="formField">
              <label>Gender*</label>

              <select
                name="gender"
                value={values.gender}
                onChange={(e) =>
                  setValues({
                    ...values,
                    gender: e.target.value
                  })
                }
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            {/* Course */}
            <div className="formField">
              <label>Course*</label>

              <select
                name="course"
                value={values.course}
                onChange={(e) =>
                  setValues({
                    ...values,
                    course: e.target.value
                  })
                }
                required
              >
                <option value="">Select Course</option>

                {courses.map((course) => (
                  <option
                    key={course}
                    value={course}
                  >
                    {course}
                  </option>
                ))}
              </select>
            </div>

            {/* City */}
            <div className="formField">
              <label>City*</label>

              <input
                type="text"
                name="city"
                value={values.city}
                onChange={(e) =>
                  setValues({
                    ...values,
                    city: e.target.value
                  })
                }
                required
              />
            </div>

            {/* Address */}
            <div className="formField">
              <label>Address*</label>

              <input
                type="text"
                name="address"
                value={values.address}
                onChange={(e) =>
                  setValues({
                    ...values,
                    address: e.target.value
                  })
                }
                required
              />
            </div>

            {/* Enrollment Date */}
            <div className="formField">
              <label>Enrolment Date*</label>

              <DatePicker
                selected={
                  values.enrollmentDate
                    ? new Date(values.enrollmentDate)
                    : null
                }
                onChange={(date) => {
                  setValues({
                    ...values,
                    enrollmentDate: date
                      ? date.toISOString().split('T')[0]
                      : ''
                  });
                }}
                dateFormat="yyyy-MM-dd"
                placeholderText="Select enrolment date"
                required
              />
            </div>

            {/* Status */}
            <div className="formField">
              <label>Status*</label>

              <select
                name="status"
                value={values.status}
                onChange={(e) =>
                  setValues({
                    ...values,
                    status: e.target.value
                  })
                }
                required
              >
                <option value="">Select Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            {/* Submit */}
            <div className="formField">
              <button type="submit">
                Add Student
              </button>
            </div>

          </form>

        </div>

      </div>
    </>
  );
};

export default AddStudent;

