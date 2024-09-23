import React, { useState } from 'react';

function TestBySemester({ onFilter, years }) {
  const [semester, setSemester] = useState('א׳');  // Default to Semester A
  const [year, setYear] = useState(years[0] || '');  // Default to the first available year

  const handleFilterClick = () => {
    if (!year || !semester) {
      alert("Please select both semester and year!");
      return;
    }
    onFilter(semester, year);
  };

  return (
    <div className="filter-container">
      <label>בחר סמסטר:</label>
      <select className="filter-select" value={semester} onChange={(e) => setSemester(e.target.value)}>
        <option value="א׳">סמסטר א׳</option>
        <option value="ב׳">סמסטר ב׳</option>
        <option value="קיץ">סמסטר קיץ</option>
      </select>

      <label>בחר שנה:</label>
      <select className="filter-select" value={year} onChange={(e) => setYear(e.target.value)}>
        <option value="">בחר שנת לימודים</option>
        {years.map((yr, index) => (
          <option key={index} value={yr}>{yr}</option>
        ))}
      </select>

      <button className="button" onClick={handleFilterClick}>סנן</button>
    </div>
  );
}

export default TestBySemester;
