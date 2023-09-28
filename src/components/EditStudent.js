import React, { useState, useEffect } from 'react';
const EditStudent = (props) => {
    // Destructure the student object from props
    const { studentId, name, email, statusCode, status } = props.student;
  
    // Create state variables to hold the edited values
    const [editedName, setEditedName] = useState(name);
    const [editedEmail, setEditedEmail] = useState(email);
    const [editedStatusCode, setEditedStatusCode] = useState(statusCode);
  
    // Handle form submission
    const handleSubmit = (e) => {
      e.preventDefault();
  
      // You can send the edited data to an API or update it in your state here
  
      // Example: Update the student object in the parent component's state
      const updatedStudent = {
        studentId,
        name: editedName,
        email: editedEmail,
        statusCode: editedStatusCode, // Update the statusCode with the edited value
        status,
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
            <label>StatusCode:</label>
            <input
              type="text"
              value={editedStatusCode}
              onChange={(e) => setEditedStatusCode(e.target.value)}
            />
          </div>
          <button type="submit">Save</button>
        </form>
      </div>
    );
  };
  
  export default EditStudent;
  