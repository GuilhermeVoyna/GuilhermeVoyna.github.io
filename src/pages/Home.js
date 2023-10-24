import Nav from "../components/Nav";
import AuthModal from "../components/AuthModal";
import { useState } from "react";
import "../css/components/Buttons.css";
import "../css/components/Nav.css";
import "../css/components/Auth-modal.css";
import "../css/components/Title.css";

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [isSigUp, setIsSignUp] = useState(true);

  const authToken = false;

  const handleClick = () => {
    console.log("clicked");
    setShowModal(true);
    setIsSignUp(true);
  };

  return (
    <div className="overlay">
      <Nav
      setShowModal={setShowModal} 
      showModal={showModal} 
      setIsSignUp={setIsSignUp}
      />
      <div className="home">
        <h1 className="primary-title">TIP4TRIPS</h1>
        <button className="primary-button" onClick={handleClick}>
          {authToken ? "Signout" : "Create Account"}
        </button>
        {showModal && <AuthModal setShowModal={setShowModal} isSignUp={isSigUp}/>}
      </div>
    </div>
  );
};
export default Home;
