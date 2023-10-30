import React, { useState, useEffect, useRef, useMemo } from "react";
import TinderCard from "react-tinder-card";
import "../css/pages/Dashboard.css";
import ChatContainer from "../components/ChatContainer";
import Nav from "../components/Nav";
import axios from "axios";
import { useCookies } from "react-cookie";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [cookies, setCookie] = useCookies(["user"]);
  const [premium,setPremium] = useState(true);
  const userId = cookies.userId;
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get("http://localhost:8000/user", {
          params: {
            userId: userId,
          },
        });
        setUser(response.data);
      } catch (err) {
        console.error(err.message);
      }
    };
    getUser();
  }, [userId]);

  console.log(user);

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

  const [currentIndex, setCurrentIndex] = useState(db.length - 1);
  const [lastDirection, setLastDirection] = useState();
  // used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex);

  const childRefs = useMemo(
    () =>
      Array(db.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  );

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canGoBack = currentIndex < db.length - 1;

  const canSwipe = currentIndex >= 0;

  // set last direction and decrease current index
  const swiped = (direction, nameToDelete, index) => {
    setLastDirection(direction);
    updateCurrentIndex(index - 1);
  };

  const outOfFrame = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
    // handle the case in which go back is pressed before card goes outOfFrame
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
    // TODO: when quickly swipe and restore multiple times the same card,
    // it happens multiple outOfFrame events are queued and the card disappear
    // during latest swipes. Only the last outOfFrame event should be considered valid
  };

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < db.length) {
      await childRefs[currentIndex].current.swipe(dir); // Swipe the card!
    }
  };

  // increase current index and show card
  
  const goBack = async () => {
    if (!canGoBack) return;
    const newIndex = currentIndex + 1;
    updateCurrentIndex(newIndex);
    await childRefs[newIndex].current.restoreCard();
  };
  //TESTE----------------
  const teste = false;
  //TESTE----------------
  return (
    <div>
      
      <Nav />
     {teste&&<div className="premium">
        <button className="premium-button" onClick={() => {setPremium(!premium); console.log(premium);}}>GET PREMIUM</button>
      </div>}
      <div className="dashboard">
        <ChatContainer />
        <div className="swipe-container">
          <div className="card-container">
            {db.map((character, index) => (
              <TinderCard
                ref={childRefs[index]}
                className="swipe"
                key={character.name}
                onSwipe={(dir) => swiped(dir, character.name, index)}
                onCardLeftScreen={() => outOfFrame(character.name, index)}
              >
                <div
                  style={{ backgroundImage: "url(" + character.url + ")" }}
                  className="card"
                >
                  <div className="card-info">
                    <h3>{character.name}</h3>
                    <div className="card-buttons">
                      <button
                        className="card-button"
                        onClick={() => swipe("left")}
                      >
                        ❌
                      </button>
                      {premium&&<button className="card-button" onClick={() => goBack()}>
                        ↩️
                      </button>}
                      <button
                        className="card-button"
                        onClick={() => swipe("right")}
                      >
                        💚
                      </button>
                    </div>
                  </div>
                </div>
              </TinderCard>
            ))}
          </div>

          {teste&&<div className="swipe-info">
            {lastDirection ? <p>You swiped {lastDirection}</p> : <p />}
          </div>}
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
