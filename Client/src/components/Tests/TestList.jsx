import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TestList({ tests }) {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
      const fetchClasses = async () => {
          try {
              const response = await axios.get('http://localhost:3000/classes');
              setClasses(response.data);
          } catch (error) {
              console.error('Error fetching classes:', error);
          }
      };

      fetchClasses();
  }, []);

  const getClassName = (classID) => {
      const foundClass = classes.find((classItem) => classItem._id === classID);
      return foundClass ? foundClass.className : 'לא נמצא';
  };

  const formatDate = (dateString) => {
      if (!dateString) return 'לא נמצא';
      const date = new Date(dateString);
      return date.toLocaleDateString('he-IL', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
      });
  };

  return (
      <table className="table test-table"> {/* Apply table class for table styling */}
          <thead>
              <tr>
                  <th>קורס</th>
                  <th>תאריך</th>
                  <th>מורה</th>
              </tr>
          </thead>
          <tbody>
              {tests.map((test) => (
                  <tr key={test._id}>
                      <td>{getClassName(test.classID)}</td>
                      <td>{formatDate(test.testDate)}</td>
                      <td>{test.teacherName || 'לא נמצא'}</td>
                  </tr>
              ))}
          </tbody>
      </table>
  );
}

export default TestList;
