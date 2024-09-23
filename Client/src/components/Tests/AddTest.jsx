import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AddTest() {
  const [classes, setClasses] = useState([]);
  const [semester, setSemester] = useState('א׳');
  const [year, setYear] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [teacherName, setTeacherName] = useState('');
  const [availableYears, setAvailableYears] = useState([]);

  useEffect(() => {
    // Fetch all classes to get the school years and class info
    axios.get('http://localhost:3000/classes')
      .then(response => {
        setClasses(response.data);

        // Extract unique school years from the classes data
        const years = [...new Set(response.data.map(cls => cls.schoolYear))];
        setAvailableYears(years); // Set unique school years for the dropdown
      })
      .catch(error => {
        console.error("Error fetching classes:", error);
      });
  }, []);

  const handleClassChange = (classId) => {
    const selected = classes.find(cls => cls._id === classId);
    setSelectedClass(classId);
    setTeacherName(selected.teacherName); // Automatically populate teacher's name
  };

  const handleAddTest = async (e) => {
    e.preventDefault();
    
    const testData = {
      classID: selectedClass,  // Ensure this is populated
      testDate: e.target.date.value,  // Ensure the date is populated
      semester,
      year,
      teacherName,
    };

    console.log('Test data being sent:', testData);  // Log the data being sent

    try {
      await axios.post('http://localhost:3000/tests', testData);
      alert("Test added successfully!");
      window.location.reload();  // Refresh the page after adding a test
    } catch (error) {
      console.error("Error adding test:", error);
      alert("Failed to add test, please try again.");
    }
  };

  const filteredClasses = classes.filter(cls => cls.semester === semester && cls.schoolYear === year);

  return (
    <form className="form-container" onSubmit={handleAddTest}>
      <label className="form-label">סמסטר:</label>
      <select className="form-input" value={semester} onChange={(e) => setSemester(e.target.value)}>
        <option value="א׳">סמסטר א׳</option>
        <option value="ב׳">סמסטר ב׳</option>
        <option value="קיץ">סמסטר קיץ</option>
      </select>

      <label className="form-label">שנת לימודים:</label>
    <select value={year} onChange={(e) => setYear(e.target.value)} className="form-input" required>
      <option value="">בחר שנת לימודים</option>
      {availableYears.map((yr, index) => (
        <option key={index} value={yr}>{yr}</option>
      ))}
    </select>

    {filteredClasses.length > 0 && (
      <>
        <label className="form-label">שם קורס:</label>
        <select onChange={(e) => handleClassChange(e.target.value)} className="form-input" required>
          <option value="">בחר קורס</option>
          {filteredClasses.map(cls => (
            <option key={cls._id} value={cls._id}>{cls.className}</option>
          ))}
        </select>

        <label className="form-label">שם מורה:</label>
        <input type="text" value={teacherName} readOnly className="form-input" />
      </>
    )}

    <label className="form-label">תאריך:</label>
    <input type="date" name="date" required className="form-input" />

    <button type="submit" className="button button-primary">הוסף מבחן</button> {/* Apply button and button-primary class */}
  </form>
);
}

export default AddTest;
