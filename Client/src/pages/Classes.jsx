import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AllClasses from '../components/Class/AllClasses';
import ClassBySemester from '../components/Class/ClassBySemester';
import AddClass from '../components/Class/AddClass'; // Assuming AddClass is a separate component

function Classes() {
  const [classes, setClasses] = useState([]);
  const [filteredClasses, setFilteredClasses] = useState([]);
  const [viewAll, setViewAll] = useState(true); // Default to view all classes
  const [showSemesterFilter, setShowSemesterFilter] = useState(false);
  const [showAddClass, setShowAddClass] = useState(false);
  const [years, setYears] = useState([]); // Store available years dynamically

  useEffect(() => {
    // Fetch all classes from the server
    axios.get('http://localhost:3000/classes')
      .then(response => {
        setClasses(response.data);
        // Extract available years from class data
        const uniqueYears = [...new Set(response.data.map(cls => cls.schoolYear))];
        setYears(uniqueYears);
        setFilteredClasses(response.data); // Show all classes by default
      })
      .catch(error => {
        console.error("Error fetching classes:", error);
      });
  }, []);

  const handleViewAllClasses = () => {
    setViewAll(true);
    setShowSemesterFilter(false);
    setShowAddClass(false); // Hide add class form
    setFilteredClasses(classes);
  };

  const handleFilterBySemester = (semester, year) => {
    console.log(`Filtering for semester: ${semester} and year: ${year}`); // Debug output
    const filtered = classes.filter(cls => cls.semester === semester && cls.schoolYear === year);
    
    if (filtered.length === 0) {
      console.log("No classes found for selected semester and year");
    }

    setFilteredClasses(filtered);
    setViewAll(true); // Set viewAll to true to ensure classes are displayed
    setShowAddClass(false); // Hide add class form
  };

  const handleShowAddClass = () => {
    setShowAddClass(true);
    setViewAll(false); // Hide class table when adding a class
    setShowSemesterFilter(false); // Hide semester filter when adding a class
  };

  return (
    <div className="container"> {/* Use container class for consistent layout */}
      <h1 className="page-header">ניהול הקורסים</h1>

      <div className="button-group"> {/* Group buttons together */}
        <button className="button button-primary" onClick={handleShowAddClass}>הוספת קורס</button>
        <button className="button button-secondary" onClick={handleViewAllClasses}>כל הקורסים</button>
        <button className="button" onClick={() => setShowSemesterFilter(!showSemesterFilter)}>קורסים לפי סמסטר ושנה</button>
      </div>

      {showAddClass && (
        <AddClass />
      )}

      {showSemesterFilter && (
        <ClassBySemester onFilter={handleFilterBySemester} years={years} />
      )}

      {viewAll && (
        <AllClasses classes={filteredClasses.length > 0 ? filteredClasses : classes} />
      )}
    </div>
  );
}

export default Classes;
