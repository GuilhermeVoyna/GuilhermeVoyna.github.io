import Tip4tripsLogo from "../images/logo_guerra.png";

const Nav = ({ setShowModal, showModal ,setIsSignUp}) => {
  const handleClick = () => {
    setShowModal(true);
    setIsSignUp(false)

  };
  const authToken = false;
  return (
    <nav>
      <div className="logo-container">
        <img className="logo" src={Tip4tripsLogo} />
      </div>
      {!authToken && 
        <button className="nav-button" onClick={handleClick} disabled={showModal}>
          Log in</button>
      }
    </nav>
  );
};
export default Nav;
