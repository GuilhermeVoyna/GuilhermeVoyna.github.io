import ChatHeader from './ChatHeader'
import MatchesDisplay from './MatchesDisplay'
import ChatDisplay from './ChatDisplay'
import { useState } from 'react'
import "../css/components/ChatContainer.css"

const ChatContainer = ({ user }) => {
    const [ clickedUser, setClickedUser ] = useState(null)

    return (
        <div className="chat-container">
            <ChatHeader user={user}/>

            <div>
                <button className="option" onClick={() => setClickedUser(null)}>Matches</button>
                <button className="option" disabled={!clickedUser}>Chat</button>
            </div>
            
            {!clickedUser && <MatchesDisplay user={user} setClickedUser={setClickedUser}/>}
            {console.log(clickedUser,"AAAA")}
            {clickedUser && <ChatDisplay tips={user} clickedUser={clickedUser}/>}
        </div>
    )
}

export default ChatContainer