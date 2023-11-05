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
  const [premium, setPremium] = useState(true);
  const [GenderedUsers, setGenderedUsers] = useState(null)
  const [db, setTypedTips] = useState(null)

  
  const userId = cookies.UserId;
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
if (user?.account_type===user?.account_search){
var num=2;}
  else{ var num=1;}
  useEffect(() => {
    

    const getGenderedUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8000/gendered-users', {
                params: {account_search: user?.account_search}
            })
            setGenderedUsers(response.data)
        } catch (error) {
            console.log(error)
        }
    }
    getGenderedUsers();
  }, [num, user?.account_search]);

  useEffect(() => {
    const getTypedTips = async () => {
        try {
            const response = await axios.get('http://localhost:8000/tips', {
                //params: {account_search: user?.account_search}
            })
            setTypedTips(response.data)
            updateCurrentIndex(response.data.length -1)
        } catch (error) {
            console.log(error)
        }
    }
    getTypedTips();
  }, []);



  const [currentIndex, setCurrentIndex] = useState(db?.length - 1);
  const [lastDirection, setLastDirection] = useState();
  // used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex);

  const childRefs = useMemo(
    () =>
      Array(db?.length)
        .fill(0)
        .map((i) => React.createRef()),
    [db?.length]
  );

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };
  

  const canGoBack = currentIndex < db?.length - num;

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
    if (canSwipe && currentIndex < db?.length) {
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
  const teste = true;
  //TESTE----------------
  const matchedUserIds = user?.matches.map(({user_id}) => user_id).concat(userId)

  const filteredGenderedUsers = db?.filter(genderedUser => !matchedUserIds.includes(genderedUser.user_id))

  //Retirar dias que ja sofrem match
  //Criar um filtro que filtra dicas pelo tip.type
  console.log(db, num,user)

  return (
    <div>
      {teste && (
        <><div className="premium">s
          <button
            className="premium-button"
            onClick={() => {
              setPremium(!premium);
              console.log(premium);
            } }
          >
            Premium status: {premium ? "ON" : "OFF"}
          </button>
        </div><div className="swipe-info">
            {lastDirection ? <p>You swiped {lastDirection}</p> : <p />}
            {currentIndex}
            <br />
            searching: {user?.account_search}
          </div></>
      )}
      <div className="dashboard">
        <ChatContainer />
        <div className="swipe-container">
          <div className="card-container">
            {db?.map((tip, index) => (
              <TinderCard
                ref={childRefs[index]}
                className="swipe"
                key={tip.title}
                onSwipe={(dir) => swiped(dir, tip.title, index)}
                onCardLeftScreen={() => outOfFrame(tip.title, index)}
              >
                <div
                  style={{ backgroundImage: "url(" + tip.url + ")" }}
                  className="card"
                >
                  <div className="card-info">
                    <h3>{tip.title}</h3>
                    <div className="card-buttons">
                      <button
                        className="card-button"
                        onClick={() => swipe("left")}
                      >
                        ❌
                      </button>
                      {premium && canGoBack && (
                        <button
                          className="card-button"
                          onClick={() => goBack()}
                        >
                          ↩️
                        </button>
                      )}
                      { (!canGoBack||!premium)&&(
                        <button
                          className="card-button"
                          style={{
                            color: "transparent",
                            textShadow: "0 0 10px rgba(255, 255, 255, 1)",
                          }}
                        >
                          ↩️
                        </button>
                      )}
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
        </div>
      </div>
    </div>
  );
}
export default Dashboard;