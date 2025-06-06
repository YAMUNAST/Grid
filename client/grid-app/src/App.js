import React, { useState, useEffect } from 'react';
import './App.css';
import clickSound from './click.mp3';

const App = () => {
  const [activeButton, setActiveButton] = useState(null);
  const clickAudio = new Audio(clickSound);

  useEffect(() => {
    fetch("http://localhost:5000/active")
      .then((res) => res.json())
      .then((data) => {
        const active = Object.entries(data).find(([_, val]) => val === 1);
        if (active) setActiveButton(parseInt(active[0].replace('btn', '')));
      });
  }, []);

  const handleClick = (number) => {
    clickAudio.play();
    setActiveButton(number);
    fetch("http://localhost:5000/click", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ button: number }),
    });
  };

  return (
    <div className="container">
      <h1 className="title">3x3 Button Grid Tracker</h1>
      <div className="grid">
        {[...Array(9)].map((_, i) => {
          const num = i + 1;
          return (
            <button
              key={num}
              onClick={() => handleClick(num)}
              className={`btn ${activeButton === num ? 'active' : ''}`}
            >
              {num}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default App;
