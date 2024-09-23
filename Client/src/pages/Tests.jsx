import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TestList from '../components/Tests/TestList'; // TestList component
import AddTest from '../components/Tests/AddTest'; // Component to add new tests
import TestBySemester from '../components/Tests/TestBySemester'; // Semester and Year filter component

function Tests() {
  const [tests, setTests] = useState([]);
  const [filteredTests, setFilteredTests] = useState([]);
  const [showSemesterFilter, setShowSemesterFilter] = useState(false); // Start with filter hidden
  const [showAddTest, setShowAddTest] = useState(false);
  const [years, setYears] = useState([]); // Available years for filtering

  useEffect(() => {
    // Fetch all tests from the server
    axios.get('http://localhost:3000/tests')
      .then(response => {
        setTests(response.data);
        setFilteredTests(response.data); // Initialize filteredTests with all tests
        // Extract distinct years from the fetched tests
        const distinctYears = Array.from(new Set(response.data.map(test => test.schoolYear)));
        setYears(distinctYears);
      })
      .catch(error => {
        console.error("Error fetching tests:", error);
      });
  }, []);

  const handleFilterBySemester = (semester, year) => {
    if (!semester || !year) {
      alert("Please select both semester and year!");
      return;
    }

    // Apply the filter to the tests
    const filtered = tests.filter(test => test.semester === semester && test.schoolYear === year);
    setFilteredTests(filtered);
  };

  const handleShowAddTest = () => {
    setShowAddTest(true);
    setShowSemesterFilter(false); // Hide filter when showing add form
  };

  const handleViewAllTests = () => {
    setFilteredTests(tests); // Show all tests again
    setShowAddTest(false); // Hide add test form
    setShowSemesterFilter(false); // Hide filter
  };

  const toggleFilterVisibility = () => {
    setShowSemesterFilter(!showSemesterFilter);
    setShowAddTest(false); // Ensure add form is hidden when showing filter
  };

  return (
    <div className="container">
      <h1 className="page-header">ניהול המבחנים</h1>

      {/* Button controls */}
      <div className="button-group">
        <button className="button button-primary" onClick={handleShowAddTest}>הוספת מבחן</button>
        <button className="button button-secondary" onClick={handleViewAllTests}>כל המבחנים</button>
        <button className="button" onClick={toggleFilterVisibility}>מבחנים לפי סמסטר ושנה</button>
      </div>

      {/* Render the add test form */}
      {showAddTest && <AddTest />}

      {/* Render the filter form */}
      {showSemesterFilter && (
        <TestBySemester onFilter={handleFilterBySemester} years={years} />
      )}

      {/* Always render the test table */}
      <TestList tests={filteredTests} />
    </div>
  );
}

export default Tests;
