import React, { useState } from 'react';
import axios from 'axios';


// Helper function to convert 'DD.MM.YYYY' to 'YYYY-MM-DD'
const convertToISODate = (date) => {
  const [day, month, year] = date.split('.');
  return `${year}-${month}-${day}`;
};

// Helper function to convert 'YYYY-MM-DD' to 'DD.MM.YYYY' for display
const formatDateForDisplay = (date) => {
  if (!date) return '';
  const isoDate = new Date(date);
  const day = String(isoDate.getDate()).padStart(2, '0');
  const month = String(isoDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = isoDate.getFullYear();
  return `${day}.${month}.${year}`;
};

// Validate manually entered dates (DD.MM.YYYY)
const validateDate = (date) => {
  const regex = /^\d{2}\.\d{2}\.\d{4}$/;
  return regex.test(date);
};

function AllClasses({ classes, onUpdateClass }) {
  const [editingClassId, setEditingClassId] = useState(null);
  const [editClassData, setEditClassData] = useState({
    className: '',
    classNumber: '',
    semester: 'א׳',
    schoolYear: '',
    creditPoints: '',
    teacherName: '',
    classStartDate: '',
    classEndDate: ''
  });

  const handleEditClick = (cls) => {
    setEditingClassId(cls._id);
    setEditClassData({
      className: cls.className || '',
      classNumber: cls.classNumber || '',
      semester: cls.semester || 'א׳',
      schoolYear: cls.schoolYear || '',
      creditPoints: cls.creditPoints || '',
      teacherName: cls.teacherName || '',
      classStartDate: cls.classStartDate ? formatDateForDisplay(cls.classStartDate) : '',
      classEndDate: cls.classEndDate ? formatDateForDisplay(cls.classEndDate) : ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditClassData({ ...editClassData, [name]: value });
  };

  const handleCancelClick = () => {
    setEditingClassId(null);
    setEditClassData({
      className: '',
      classNumber: '',
      semester: 'א׳',
      schoolYear: '',
      creditPoints: '',
      teacherName: '',
      classStartDate: '',
      classEndDate: ''
    });
  };

  const handleSaveClick = () => {
    if (!validateDate(editClassData.classStartDate) || !validateDate(editClassData.classEndDate)) {
      alert("Please enter valid dates in the format DD.MM.YYYY");
      return;
    }

    const updatedData = {
      ...editClassData,
      classStartDate: convertToISODate(editClassData.classStartDate),
      classEndDate: convertToISODate(editClassData.classEndDate)
    };

    axios.put(`http://localhost:3000/classes/${editingClassId}`, updatedData)
      .then(response => {
        onUpdateClass(response.data);
        setEditingClassId(null);
        setEditClassData({
          className: '',
          classNumber: '',
          semester: 'א׳',
          schoolYear: '',
          creditPoints: '',
          teacherName: '',
          classStartDate: '',
          classEndDate: ''
        });
      })
      .catch(error => {
        console.error("Error updating class:", error);
      });
  };

  return (
    <table className="table">
      <thead className="table-header">
        <tr>
          <th className="table-header-cell">שם הקורס</th>
          <th className="table-header-cell">מספר קורס</th>
          <th className="table-header-cell">סמסטר</th>
          <th className="table-header-cell">שנת לימודים</th>
          <th className="table-header-cell">נקודות זכות</th>
          <th className="table-header-cell">שם מרצה</th>
          <th className="table-header-cell">תאריך התחלה</th>
          <th className="table-header-cell">תאריך סיום</th>
          <th className="table-header-cell">עריכה</th>
        </tr>
      </thead>
      <tbody className="table-body">
        {classes.map((cls) => (
          <tr key={cls._id} className="table-row">
            {editingClassId === cls._id ? (
              <>
                <td><input type="text" name="className" value={editClassData.className} onChange={handleInputChange} className="form-input" /></td>
                <td><input type="text" name="classNumber" value={editClassData.classNumber} onChange={handleInputChange} className="form-input" /></td>
                <td>
                  <select name="semester" value={editClassData.semester} onChange={handleInputChange} className="form-select">
                    <option value="א׳">א׳</option>
                    <option value="ב׳">ב׳</option>
                    <option value="קיץ">קיץ</option>
                  </select>
                </td>
                <td><input type="number" name="schoolYear" value={editClassData.schoolYear} onChange={handleInputChange} className="form-input" /></td>
                <td><input type="text" name="creditPoints" value={editClassData.creditPoints} onChange={handleInputChange} className="form-input" /></td>
                <td><input type="text" name="teacherName" value={editClassData.teacherName} onChange={handleInputChange} className="form-input" /></td>
                <td><input type="text" name="classStartDate" value={editClassData.classStartDate} onChange={handleInputChange} placeholder="DD.MM.YYYY" className="form-input" /></td>
                <td><input type="text" name="classEndDate" value={editClassData.classEndDate} onChange={handleInputChange} placeholder="DD.MM.YYYY" className="form-input" /></td>
                <td>
                  <button onClick={handleSaveClick} className="button-save">שמור</button>
                  <button onClick={handleCancelClick} className="button-cancel">ביטול</button>
                </td>
              </>
            ) : (
              <>
                <td>{cls.className}</td>
                <td>{cls.classNumber}</td>
                <td>{cls.semester}</td>
                <td>{cls.schoolYear}</td>
                <td>{cls.creditPoints}</td>
                <td>{cls.teacherName}</td>
                <td>{formatDateForDisplay(cls.classStartDate)}</td>
                <td>{formatDateForDisplay(cls.classEndDate)}</td>
                <td><button onClick={() => handleEditClick(cls)} className="button-edit">עריכה</button></td>
              </>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
  
}

export default AllClasses;
