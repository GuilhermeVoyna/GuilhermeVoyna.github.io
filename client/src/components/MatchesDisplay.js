import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const MatchesDisplay = ({ matches, setClickedUser }) => {

  

  const [matchedProfiles, setMatchedProfiles] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(null);

  const matchedUserIds = matches.map(({ tip_id }) => tip_id);
  console.log(matchedUserIds, "matchedUserIds")
  const getMatches = async () => {
    try {
      const matchedTipIds =matchedUserIds
      const response = await axios.get("http://localhost:8000/tips-match", {
        params: { matchedTipIds:matchedTipIds },
      });
      setMatchedProfiles(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(matchedProfiles, "matchedProfiles");

  useEffect(() => {
    getMatches();
  }, [matches]);

  const filteredMatchedProfiles = matchedProfiles

  return (
    <div className="matches-display">
      {filteredMatchedProfiles?.map((match, _index) => (
        <div
          key={_index}
          className="match-card"
          onClick={() => setClickedUser(match)}
        >
          <div className="img-container">
            <img src={match?.url} alt={match?.first_name + " profile"} />
          </div>
          <h3>{match?.first_name}</h3>
        </div>
      ))}
    </div>
  );
};

export default MatchesDisplay;