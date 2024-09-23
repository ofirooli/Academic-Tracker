import React, { useState, useEffect } from "react";
import axios from "axios";
import { format, isPast, isThisWeek, isThisMonth } from "date-fns";
import he from "date-fns/locale/he"; // התאמת שפה לעברית

function ScoreList() {
  const [scores, setScores] = useState([]);
  const [tests, setTests] = useState([]);
  const [classes, setClasses] = useState([]);

  // פונקציה לשליפת הציונים
  const fetchScores = async () => {
    try {
      const res = await axios.get("http://localhost:3000/scores");
      setScores(res.data);
    } catch (err) {
      console.error("Error fetching scores:", err);
    }
  };

  // פונקציה לשליפת המבחנים
  const fetchTests = async () => {
    try {
      const res = await axios.get("http://localhost:3000/tests");
      setTests(res.data);
    } catch (err) {
      console.error("Error fetching tests:", err);
    }
  };

  // פונקציה לשליפת הקורסים
  const fetchClasses = async () => {
    try {
      const res = await axios.get("http://localhost:3000/classes");
      setClasses(res.data);
    } catch (err) {
      console.error("Error fetching classes:", err);
    }
  };

  useEffect(() => {
    fetchScores();
    fetchTests();
    fetchClasses();
  }, []);

  // פונקציה לקביעת סטטוס לפי התאריך
  const getStatus = (testDate) => {
    const date = new Date(testDate);
    if (isPast(date)) return "עבר";
    if (isThisWeek(date)) return "השבוע";
    if (isThisMonth(date)) return "החודש";
    return "בקרוב";
  };

  return (
    <div className="container score-list"> {/* Apply container and score-list class for layout and styling */}
      <table className="table"> {/* Apply table class for table styling */}
        <thead>
          <tr>
            <th>קורס</th>
            <th>תאריך מבחן</th>
            <th>סטטוס</th>
            <th>ציון</th>
          </tr>
        </thead>
        <tbody>
          {scores.length === 0 ? (
            <tr>
              <td colSpan="4">לא נמצאו ציונים</td>
            </tr>
          ) : (
            scores.map((score) => {
              const test = tests.find((t) => t._id === score.testID);
              const course = classes.find((c) => c._id === test?.classID);
  
              return (
                <tr key={score._id}>
                  <td>{course?.className || "לא נמצא"}</td>
                  <td>{test ? format(new Date(test.testDate), "dd/MM/yyyy", { locale: he }) : "לא נמצא"}</td>
                  <td>{test ? getStatus(test.testDate) : "לא נמצא"}</td>
                  <td>{score.value || "לא הוזן"}</td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
  
}

export default ScoreList;
