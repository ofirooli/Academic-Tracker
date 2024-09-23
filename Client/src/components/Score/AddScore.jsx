import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddScore = () => {
  const [semester, setSemester] = useState('');
  const [schoolYear, setSchoolYear] = useState('');
  const [classID, setClassID] = useState('');
  const [score, setScore] = useState('');
  const [availableYears, setAvailableYears] = useState([]);
  const [availableClasses, setAvailableClasses] = useState([]);

  // Fetch all classes to get the school years and class info
  useEffect(() => {
    axios.get('http://localhost:3000/classes')
      .then(response => {
        setAvailableClasses(response.data);

        // Extract unique school years from the classes data
        const years = [...new Set(response.data.map(cls => cls.schoolYear))];
        setAvailableYears(years); // Set unique school years for the dropdown
      })
      .catch(error => {
        console.error("Error fetching classes:", error);
      });
  }, []);

  // Filter classes based on selected year and semester
  const filteredClasses = availableClasses.filter(cls => 
    cls.schoolYear === schoolYear && cls.semester === semester);

  const handleAddScore = (e) => {
    e.preventDefault(); // Prevent page reload
    const newScore = { classID, score };

    axios.post('http://localhost:3000/scores', newScore)
      .then(response => {
        alert('Score added successfully');
      })
      .catch(error => {
        console.error("Error adding score:", error);
      });
  };

  return (
<form className="form-container" onSubmit={handleAddScore}> {/* Wrapping everything in form-container */}
    <h2 className="page-header">הוסף ציון</h2> {/* Use page-header for consistent heading style */}

      <label className="form-label">בחר סמסטר:</label>
      <select className="form-input" value={semester} onChange={e => setSemester(e.target.value)}>
        <option value="">בחר סמסטר</option>
        <option value="א">סמסטר א</option>
        <option value="ב">סמסטר ב</option>
        <option value="קיץ">סמסטר קיץ</option>
      </select>

      <label className="form-label">שנת לימודים:</label>
    <select className="form-input" value={schoolYear} onChange={e => setSchoolYear(e.target.value)}>
      <option value="">בחר שנת לימודים</option>
      {availableYears.map(year => (
        <option key={year} value={year}>{year}</option>
      ))}
    </select>

    <label className="form-label">שם קורס:</label>
    <select className="form-input" value={classID} onChange={e => setClassID(e.target.value)}>
      <option value="">בחר קורס</option>
      {filteredClasses.map(cls => (
        <option key={cls._id} value={cls._id}>{cls.className}</option>
      ))}
    </select>

    <label className="form-label">ציון:</label>
    <input
      className="form-input"
      type="number"
      value={score}
      onChange={e => setScore(e.target.value)}
      placeholder="הכנס ציון"
    />

    <button className="button button-primary" type="submit">הוסף ציון</button> {/* Apply button and button-primary */}
  </form>
);
};

export default AddScore;
