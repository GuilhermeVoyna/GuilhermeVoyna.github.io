import Chat from './Chat'
import ChatInput from './ChatInput'
import axios from 'axios'
import {useState, useEffect} from "react"


const ChatDisplay = ({ user , clickedUserId ,clickedTipId}) => {

    const userId = user?.user_id
    
    const [usersMessages, setUsersMessages] = useState(null)
    const [clickedUser, setClickedUser] = useState(null)
    const [clickedUsersMessages, setClickedUsersMessages] = useState(null)
    const getUser = async () => {
      try {
             const response = await axios.get('http://localhost:8000/user', {
                 params: { userId: clickedUserId}
             })
             setClickedUser(response.data)
         } catch (error) {
          console.log(error)
      }
     }
 

    const getUsersMessages = async () => {
     try {
            const response = await axios.get('http://localhost:8000/messages', {
                params: { userId: userId, correspondingUserId: clickedUserId, clickedTipId: clickedTipId}
            })
         setUsersMessages(response.data)
        } catch (error) {
         console.log(error)
     }
    }

    const getClickedUsersMessages = async () => {
        try {
            const response = await axios.get('http://localhost:8000/messages', {
                params: { userId: clickedUserId , correspondingUserId: userId, clickedTipId: clickedTipId}
            })
            setClickedUsersMessages(response.data)
        } catch (error) {
            console.log(error)
        }
    }
    console.log("DDD",clickedUser)
    console.log("DDDuser",usersMessages)
    console.log("DDDmessage",clickedUsersMessages)
    console.log("DDDtip1",clickedTipId)
    console.log("DDDtip2",clickedUserId)
    console.log("DDDtip3",userId)

    useEffect(() => {
        getUsersMessages()
        getClickedUsersMessages()
        getUser()
    }, [])

    const messages = []

    usersMessages?.forEach(message => {
        const formattedMessage = {}
        formattedMessage['name'] = user?.first_name
        formattedMessage['img'] = user?.url
        formattedMessage['message'] = message.message
        formattedMessage['timestamp'] = message.timestamp
        messages.push(formattedMessage)
    })

    clickedUsersMessages?.forEach(message => {
        const formattedMessage = {}
        formattedMessage['name'] = clickedUser?.first_name
        formattedMessage['img'] = clickedUser?.url
        formattedMessage['message'] = message.message
        formattedMessage['timestamp'] = message.timestamp
        messages.push(formattedMessage)
    })

    const descendingOrderMessages = messages?.sort((a,b) => a.timestamp.localeCompare(b.timestamp))
    console.log(clickedUser,"CCC",clickedUserId)
    return (
        <>
        <Chat descendingOrderMessages={descendingOrderMessages}/>
     <ChatInput
         user={user}
         clickedUser={clickedUser} getUserMessages={getUsersMessages} getClickedUsersMessages={getClickedUsersMessages} clickedTipId={clickedTipId}/>
        </>
    )
}

export default ChatDisplay