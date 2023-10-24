import "../css/components/Buttons.css";
import "../css/pages/Search.css";
import "../css/components/Title.css";
import Tip4tripsLogo from "../images/logo_guerra.png";
const Search = () => {
  return (
    <div className="overlay">
      <div className="search">
        <img className="logo" src={Tip4tripsLogo} />
        <h1 className="primary-title">Search</h1>
        <input className="search-input" placeholder="O QUE VOCÊ PROCURA?!" />
      </div><button className="secondary-button">Search</button>
    </div>
  );
};
export default Search;
