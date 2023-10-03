import pepsilogo from "../images/pepsi-logo-0.png";

const Nav = ({ setShowModal, showModal ,setIsSignUp}) => {
  const handleClick = () => {
    setShowModal(true);
    setIsSignUp(false)

  };
  const authToken = true;
  return (
    <nav>
      <div className="logo-container">
        <img className="logo" src={pepsilogo} />
      </div>
      {!authToken && 
        <button className="nav-button" onClick={handleClick} disabled={showModal}>
          Log in</button>
      }
    </nav>
  );
};
export default Nav;
