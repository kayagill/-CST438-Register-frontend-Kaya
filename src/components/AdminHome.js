import React, { useState, useEffect } from 'react';
import EditStudent from './EditStudent';
const AdminHome = () => {
  const [students, setStudents] = useState([]);
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentEmail, setNewStudentEmail] = useState('');
  const [message, setMessage] = useState('');
  const [editedStudent, setEditedStudent] = useState(null);

  useEffect(() => {
    // Fetch students when the component mounts
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    const endpoint = 'http://localhost:8080/student';
    fetch(endpoint)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setStudents(data);
      })
      .catch((err) => {
        console.error('exception fetchStudents' + err);
        setMessage('Exception. ' + err.message);
      });
  };

  const handleDeleteStudent = (studentId) => {
    const endpoint = `http://localhost:8080/student/${studentId}`;
    console.log('Deleting student with ID:', studentId);
    fetch(endpoint, { method: 'DELETE' })
      .then((response) => {
        console.log('Delete response:', response);
        if (response.ok) {
          const updatedStudents = students.filter((student) => student.studentId !== studentId);
          setStudents(updatedStudents);
        } else {
          setMessage('Failed to delete student');
        }
      })
      .catch((err) => {
        console.log('exception deleteStudent ' + err);
        setMessage('Exception. ' + err.message);
      });
  };

  // Set the student to be edited in state
  const handleEditStudent = (student) => {
    setEditedStudent(student);
  };

  // Handle the submission of edited student data
  const handleEditSubmit = (editedStudentData) => {
    // Handle the submission of edited student data here, e.g., send it to an API or update it in your state
    console.log('Updated Student Data:', editedStudentData);

    // Find the index of the edited student in the students array
    const index = students.findIndex((student) => student.studentId === editedStudentData.studentId);

    if (index !== -1) {
      // Create a new array with the edited student data
      const updatedStudents = [...students];
      updatedStudents[index] = editedStudentData;

      // Update the students state with the new array
      setStudents(updatedStudents);
    }

    // Clear the edited student data to indicate that editing is complete
    setEditedStudent(null);
  };

  const handleAddStudent = () => {
    // Check if the newStudentEmail follows a valid email format
    const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailFormat.test(newStudentEmail)) {
      // If it's not a valid email, set an error message and return
      setMessage('Must be a Valid Email');
      return;
    }

    // Create a new student object with the provided data
    const newStudent = {
      name: newStudentName,
      email: newStudentEmail,
      statusCode: 0, // Set an appropriate value for statusCode if needed
      status: null,  // Set an appropriate value for status if needed
    };

    // Check if the newStudentEmail is already in use by existing students
    const isEmailInUse = students.some((student) => student.email === newStudentEmail);
    if (isEmailInUse) {
      // If the email is already in use, set an error message and return
      setMessage('Email Already in Use');
      return;
    }

    // Generate a unique studentId for the new student
    const nextStudentId = students.length + 1;
    newStudent.studentId = nextStudentId;

    // Add the new student to the students array and update the state
    setStudents([...students, newStudent]);

    // Clear the input fields
    setNewStudentName('');
    setNewStudentEmail('');

    // Clear any previous error message
    setMessage('');
  };

  return (
    <div>
      <h3>Student List</h3>
      <ul>
        {students.map((student, index) => (
          <li key={index}>
            {student.name} - {student.email}
            <button type="button" onClick={() => handleDeleteStudent(student.studentId)}>
              Delete
            </button>
            <button type="button" onClick={() => handleEditStudent(student)}>
              Edit
            </button>
          </li>
        ))}
      </ul>
      <h3>Add Student</h3>
      <input
        type="text"
        placeholder="Student Name"
        value={newStudentName}
        onChange={(e) => setNewStudentName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Student Email"
        value={newStudentEmail}
        onChange={(e) => setNewStudentEmail(e.target.value)}
      />
      <button type="button" onClick={handleAddStudent}>
        Add
      </button>

      {editedStudent && (
        <EditStudent
          student={editedStudent}
          onCancel={() => setEditedStudent(null)}
          onEdit={handleEditSubmit}
          onDelete={handleDeleteStudent} // Pass the onDelete function
        />
      )}
      {message && <p>{message}</p>}
    </div>
  );
};

export default AdminHome;
