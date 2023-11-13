import ChatHeader from './ChatHeader'
import MatchesDisplay from './MatchesDisplay'
import ChatDisplay from './ChatDisplay'
import { useState } from 'react'
import "../css/components/ChatContainer.css"

const ChatContainer = ({ user }) => {
    const [ clickedUser, setClickedUser ] = useState(null)
    const tips = user.tips;

    return (
        <div className="chat-container">
            <ChatHeader user={user}/>

            <div>
                <button className="option" onClick={() => setClickedUser(null)}>Matches</button>
                <button className="option" disabled={!clickedUser}>Chat</button>
            </div>
            
            {!clickedUser && <MatchesDisplay matches={tips} setClickedUser={setClickedUser}/>}

            {clickedUser && <ChatDisplay tips={tips} clickedUser={clickedUser}/>}
        </div>
    )
}

export default ChatContainer