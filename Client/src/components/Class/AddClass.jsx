import React, { useState } from 'react';
import axios from 'axios';

function AddClass() {
  const [className, setClassName] = useState('');
  const [classNumber, setClassNumber] = useState('');
  const [semester, setSemester] = useState('א׳');
  const [schoolYear, setSchoolYear] = useState('');
  const [creditPoints, setCreditPoints] = useState(0);
  const [teacherName, setTeacherName] = useState('');
  const [classStartDate, setClassStartDate] = useState('');
  const [classEndDate, setClassEndDate] = useState('');

  const handleAddClass = async (e) => {
    e.preventDefault();

    // Convert the date fields to proper Date objects
    const classData = {
      className,
      classNumber,
      semester,
      schoolYear,
      creditPoints,
      teacherName,
      classStartDate: new Date(classStartDate), // Ensure correct format
      classEndDate: new Date(classEndDate)      // Ensure correct format
    };

    try {
      const response = await axios.post('http://localhost:3000/classes', classData);
      alert("Class added successfully!");

      // Refresh the page after successful submission
      window.location.reload();
    } catch (error) {
      console.error("Error adding class:", error);
      alert("Failed to add class, please try again.");
    }
  };

  return (
<div className="container"> {/* Apply container class for layout */}
  <h2 className="page-header">הוסף קורס חדש</h2> {/* Use page-header for consistent heading style */}
  <form onSubmit={handleAddClass} className="form-container"> {/* Apply form-container for form layout */}
    
    <label className="form-label">שם הקורס:</label>
    <input
      type="text"
      value={className}
      onChange={(e) => setClassName(e.target.value)}
      required
      className="form-input" 
    />

    <label className="form-label">מספר קורס:</label>
    <input
      type="text"
      value={classNumber}
      onChange={(e) => setClassNumber(e.target.value)}
      required
      className="form-input"
    />

    <label className="form-label">סמסטר:</label>
    <select
      value={semester}
      onChange={(e) => setSemester(e.target.value)}
      className="form-input"
    >
      <option value="א׳">א׳</option>
      <option value="ב׳">ב׳</option>
      <option value="קיץ">קיץ</option>
    </select>

    <label className="form-label">שנת לימודים:</label>
    <input
      type="number"
      value={schoolYear}
      onChange={(e) => setSchoolYear(e.target.value)}
      required
      className="form-input"
    />

    <label className="form-label">נקודות זכות:</label>
    <input
      type="number"
      value={creditPoints}
      onChange={(e) => setCreditPoints(e.target.value)}
      required
      className="form-input"
    />

    <label className="form-label">שם המרצה:</label>
    <input
      type="text"
      value={teacherName}
      onChange={(e) => setTeacherName(e.target.value)}
      required
      className="form-input"
    />

    <label className="form-label">תאריך התחלה:</label>
    <input
      type="date"
      value={classStartDate}
      onChange={(e) => setClassStartDate(e.target.value)}
      required
      className="form-input"
    />

    <label className="form-label">תאריך סיום:</label>
    <input
      type="date"
      value={classEndDate}
      onChange={(e) => setClassEndDate(e.target.value)}
      required
      className="form-input"
    />

    <button type="submit" className="button button-primary">הוסף קורס</button> {/* Apply button and button-primary */}
  </form>
</div>

  );
}

export default AddClass;
