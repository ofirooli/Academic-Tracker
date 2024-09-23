import React, { useEffect, useState } from "react";
import axios from "axios";
import ScoreList from "../components/Score/ScoreList";
import AddScore from "../components/Score/AddScore";

const Scores = () => {
  const [scores, setScores] = useState([]); // Ensure initial state is an array
  const [showAddScore, setShowAddScore] = useState(false);

  useEffect(() => {
    fetchScores();
  }, []);

  const fetchScores = async () => {
    try {
      const response = await axios.get("/scores");
      setScores(response.data || []); // Ensure the response is an array
    } catch (error) {
      console.error("Error fetching scores", error);
    }
  };

  const handleScoreAdded = () => {
    setShowAddScore(false);
    fetchScores();
  };

  return (
    <div className="container"> {/* Use the container class for consistent layout */}
      <h1 className="page-header">ניהול ציונים</h1>
      <div className="button-group"> {/* Use button group for organizing buttons */}
        <button className="button button-primary" onClick={() => setShowAddScore(true)}>הוסף ציון</button>
        <button className="button button-secondary" onClick={() => setShowAddScore(false)}>כל הציונים</button>
      </div>
      {showAddScore ? (
        <AddScore onScoreAdded={handleScoreAdded} />
      ) : (
        <ScoreList scores={scores} />
      )}
    </div>
  );
  
};

export default Scores;
