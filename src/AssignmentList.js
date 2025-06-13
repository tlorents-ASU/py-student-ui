import React, { useState, useEffect } from 'react';

const AssignmentList = () => {
  const [assignments, setAssignments] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await fetch('https://localhost:7209/api/StudentClassAssignment');
        if (!response.ok) throw new Error('Failed to fetch assignments');
        const data = await response.json();
        setAssignments(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchAssignments();
  }, []);

  return (
    <div style={styles.container}>
      <h2>Student Assignments</h2>
      {error && <p style={styles.error}>Error: {error}</p>}
      <table style={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Student ID</th>
            <th>Position</th>
            <th>Email</th>
            <th>Education Level</th>
            <th>Subject</th>
            <th>Catalog Number</th>
            <th>Weekly Hours</th>
            <th>Compensation</th>
            {/* Add other headers as needed */}
          </tr>
        </thead>
        <tbody>
          {assignments.map((a) => (
            <tr key={a.id}>
              <td>{a.id}</td>
              <td>{a.Student_ID}</td>
              <td>{a.Position}</td>
              <td>{a.Email}</td>
              <td>{a.EducationLevel}</td>
              <td>{a.Subject}</td>
              <td>{a.CatalogNum}</td>
              <td>{a.WeeklyHours}</td>
              <td>{a.Compensation}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: { padding: '20px', fontFamily: 'Arial, sans-serif' },
  error: { color: 'red' },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: { border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2' },
  td: { border: '1px solid #ddd', padding: '8px' }
};

export default AssignmentList;
