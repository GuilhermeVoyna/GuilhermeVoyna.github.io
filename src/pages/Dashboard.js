import React, { useState, useMemo, useRef } from "react";
import TinderCard from "react-tinder-card";
import "../css/pages/Dashboard.css";
import ChatContainer from "../components/ChatContainer";

function Dashboard() {
  const db = [
    {
      name: "Richard Hendricks",
      url: "https://i.imgur.com/oPj4A8u.jpg",
    },
    {
      name: "Erlich Bachman",
      url: "https://i.imgur.com/oPj4A8u.jpg",
    },
    {
      name: "Monica Hall",
      url: "https://i.imgur.com/oPj4A8u.jpg",
    },
    {
      name: "Jared Dunn",
      url: "https://i.imgur.com/oPj4A8u.jpg",
    },
    {
      name: "Dinesh Chugtai",
      url: "https://i.imgur.com/oPj4A8u.jpg",
    },
  ];
  const characters = db;

  const [LastDirection, setLastDirection] = useState();

  const swiped = (direction, nameToDelete) => {
    console.log("removing: " + nameToDelete);
    setLastDirection(direction);
  };

  const onSwipe = (direction) => {
    console.log("You swiped: " + direction);
  };

  const onCardLeftScreen = (myIdentifier) => {
    console.log(myIdentifier + " left the screen");
  };
  const outOfFrame = (name) => {
    console.log(name + " left the screen!");
  };

  return (
    <div className="dashboard">
      <ChatContainer />
      <div className="swipe-container">
        <div className="card-container">
          {characters.map((character) => (
            <TinderCard
              className="swipe"
              key={character.name}
              onSwipe={(dir) => swiped(dir, character.name)}
              onCardLeftScreen={() => outOfFrame(character.name)}
            >
              <div
                style={{ backgroundImage: "url(" + character.url + ")" }}
                className="card"
              >
                <div className="card-info">
                    <h3>{character.name}</h3>
                    <div className="card-button">
                    <button>X</button>
                    <button>B</button>
                    <button>Y</button>
                  </div>
                </div>
        
              </div>
            </TinderCard>
          ))}
        </div>

        <div className="swipe-info">
          {LastDirection ? <p>You swiped {LastDirection}</p> : <p />}
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
