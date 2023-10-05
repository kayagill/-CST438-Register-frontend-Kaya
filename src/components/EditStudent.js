import React, { useState, useEffect } from 'react';
const EditStudent = (props) => {
    // Destructure the student object from props
    const { studentId, name, email, statusCode, status } = props.student;
  
    // Create state variables to hold the edited values
    const [editedName, setEditedName] = useState(name);
    const [editedEmail, setEditedEmail] = useState(email);
    const [editedStatus, setEditedStatus] = useState(status);
  
    // Handle form submission
    const handleSubmit = (e) => {
      e.preventDefault();
  
      // You can send the edited data to an API or update it in your state here
  
      // Example: Update the student object in the parent component's state
      const updatedStudent = {
        studentId,
        name: editedName,
        email: editedEmail,
        statusCode, // Update the statusCode with the edited value
        status: editedStatus,
      };
  
      // Call a function to update the student data in the parent component
      props.onEdit(updatedStudent);
    };
  
    return (
      <div>
        <h2>Edit Student</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={editedEmail}
              onChange={(e) => setEditedEmail(e.target.value)}
            />
          </div>
          <div>
            <label>Status:</label>
            <input
              type="text"
              value={editedStatus}
              onChange={(e) => setEditedStatus(e.target.value)}
            />
          </div>
          <button type="submit">Save</button>
        </form>
      </div>
    );
  };
  
  export default EditStudent;
  