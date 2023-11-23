import React, { useState, useEffect, useRef, useMemo } from "react";
import TinderCard from "react-tinder-card";
import "../css/pages/Dashboard.css";
import ChatContainer from "../components/ChatContainer";
import CardInfo from "../components/CardInfo";
import axios from "axios";
import { useCookies } from "react-cookie";
import Tip from "../components/Tip";

function Dashboard() {
  
  const [user, setUser] = useState(null);
  const [cookies, setCookie] = useCookies(["user"]);
  const [premium, setPremium] = useState(false);
  const [GenderedUsers, setGenderedUsers] = useState(null);
  const [db, setTipsUsers] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [TipUser, setTipUser] = useState(null);

  const isATiper = user?.account_type === 'tiper';
const handleClick = () => {
  console.log("clicked");
  setTipUser(db[currentIndex]);
  setShowModal(prevShowModal => !prevShowModal);
  console.log(TipUser,"tipUser")
};

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
        setPremium(response.data.premium)

      } catch (err) {
        console.error(err.message);
      }
    };
    getUser();
  }, [userId]);


  useEffect(() => {
    const getTypedTips = async () => {
      try {
        const matchedTipIds = (user?.tips|| [])
          .map(({ tip_id }) => tip_id)
          .concat(userId);

        const response = await axios.get("http://localhost:8000/tips", {
          params: { matchedTipIds: matchedTipIds },
        });
        setTipsUsers(response.data);
        console.log(matchedTipIds,"matchedTipIds");
        updateCurrentIndex(response.data.length - 1);
      } catch (error) {
        console.log(error);
      }
    };
    getTypedTips();
  }, [user?.matches, userId]);

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

  const canGoBack = currentIndex < db?.length - 1;

  const canSwipe = currentIndex >= 0;
  const updateMatches = async (swipedTipId,swipedUserId) => {
    try {
        await axios.put('http://localhost:8000/addmatch', {
          swipedTipId,
          swipedUserId,
          userId,
        })
    } catch (err) {
        console.log(err)
    }
}

  // set last direction and decrease current index
  const swiped = (direction,swipedTipId,swipedUserId, index) => {

    if (direction === "right") {
      updateMatches(swipedTipId,swipedUserId);
    }


    setLastDirection(direction);
    updateCurrentIndex(index - 1);
    setShowModal(false)
    console.log(direction,"direction")
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
  const teste =false;
  //TESTE----------------
  

  console.log(user,"user")
  return (
    <div>
      {teste && (
        <>
          <div className="premium">
            <button
              className="premium-button"
              onClick={() => {
                setPremium(!premium);
                console.log(premium);
              }}
            >
              Premium status: {premium ? "ON" : "OFF"}
            </button>
          </div>
          <div className="swipe-info">
            {lastDirection ? <p>You swiped {lastDirection}</p> : <p />}
            {currentIndex}
            <br />
            searching: {user?.account_search}
          </div>
        </>
      )}
      <div className="dashboard">
      <ChatContainer user={user ||{ matches : [],tips:[]} }/>
        {!isATiper &&(<div className="swipe-container">
        
          <div className="card-container">
            {db?.map((tip, index) => (
              <TinderCard
                ref={childRefs[index]}
                className="swipe"
                key={tip.title}
                onSwipe={(dir) => swiped(dir,tip.tip_id,tip.user_id, index)}
                onCardLeftScreen={() => {outOfFrame(tip.title, index)}}
              >
                <div
                  style={{ backgroundImage: "url(" + tip.url + ")" }}
                  className="card"
                >
                  <div className="card-info">
                    <div className="info">
                      <span className="name"> {tip.title}</span>
                      <span className="country"> {tip.country}</span>
                      <span className="info-icon">
                        <button className="card-button" onClick={handleClick}>
                          ℹ️
                        </button>
                      </span>
                    </div>
                    <div className="card-buttons">
                      <button
                        className="card-button"
                        onClick={() => { setShowModal(false); swipe("left"); }}
                      >
                        ❌
                      </button>
                      {premium && canGoBack && (
                        <button
                          className="card-button"
                          onClick={() => { setShowModal(false); goBack();}}
                        >
                          ↩️
                        </button>
                      )}
                      {(!canGoBack || !premium) && (
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
                        onClick={() => { setShowModal(false); swipe("right");}}
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
        )}
        <div className="card-info">{showModal && <CardInfo setShowModal={setShowModal} TipUser={TipUser} />}</div>
        {isATiper && (<Tip/>)}
      </div>
    </div>
  );
}
export default Dashboard;
