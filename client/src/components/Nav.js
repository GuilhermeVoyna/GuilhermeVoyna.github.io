import Tip4tripsLogo from "../images/logo_guerra.png";

const Nav = ({ setShowModal, showModal ,setIsSignUp}) => {
  const handleClick = () => {
    setShowModal(true);
    setIsSignUp(false)

  };
  const authToken = true;
  return (
    <nav>
      <div className="logo-container">
        <img className="logo" src={Tip4tripsLogo} />
      </div>
      <div className="nav-links">

        <a href="/">Home</a>
        <a href="/dashboard">Dashboard</a>
        <a href="/onboarding">Onboarding</a>
        <a href="/search">Search</a>
        <a href="/dica">Dica</a>
      </div>
      {!authToken && (
        <button className="nav-button" onClick={handleClick} disabled={showModal}>
          Log in</button>
      )}
      
    </nav>
  );
};
export default Nav;