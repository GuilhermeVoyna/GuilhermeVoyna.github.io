import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const MatchesDisplay = ({ user, setClickedUser,setClickedTip }) => {

  
  
  const [tipProfile, setTipProfiles] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(null);

  const matches = user.matches;
  const tipIdObj = user.tips.map(({ tip_id }) => tip_id);



  const getTips = async () => {
    try {

      const response = await axios.get("http://localhost:8000/tips-match", {
        params: { matchedTipIds:tipIdObj},
      });
      setTipProfiles(response.data);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    getTips();
  }, [tipIdObj]);

  return (
    <div className="matches-display">
      {matches?.map((array, _index) => (
        
        <div
          key={_index}
          className="match-card"
          onClick={() =>{ setClickedUser(array[0]);setClickedTip(array[1])}}
        >
          <div className="img-container">
            <img src={tipProfile?.filter(obj => obj.tip_id ===array[1])[0].url} alt={tipProfile?.filter(obj => obj.tip_id ===array[1])[0].title + " tip"} />
          </div>
          <h3>{tipProfile?.filter(obj => obj.tip_id ===array[1])[0].title}</h3>
        </div>
      ))}
    </div>
  );
};

export default MatchesDisplay;