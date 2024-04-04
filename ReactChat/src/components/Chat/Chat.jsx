import React, { useEffect, useState } from 'react'
import { user } from '../Joining/J'
import socketIO from 'socket.io-client'
import "./Chat.css"
import sendLogo from "../../images/send.png"
import Message from '../Message/Message'
import ReactScrollToBottom from "react-scroll-to-bottom"
import closeIcon from "../../images/closeIcon.png"

const ENDPOINT='http://localhost:3500/'
let sockets;

function Chat() {
    
   const [id,setId] = useState("")
   const [messages,setMessages] =useState([])

    const send = ()=>{
        const message = document.getElementById('chatInput').value
        sockets.emit('message',{message,id})
        document.getElementById('chatInput').value = ""
    }
    
    useEffect(()=>{
        sockets = socketIO(ENDPOINT,{transports:['websocket']});
        sockets.on('connect', () => {
            if (!id) {
              alert('connected');
              setId(sockets.id);
            }
          });

       sockets.emit('send',{ user })

       sockets.on('welcome',(data)=>{
        setMessages([...messages, data])
        console.log(data.user,data.message)
       })

       sockets.on('userJoined',(data)=>{
        setMessages([...messages, data])
        console.log(data.user,data.message)
       })

       sockets.on('leave',(data)=>{
        setMessages([...messages, data])
        console.log(data.user,data.message)
       })

       return ()=>{
        sockets.disconnect();
        sockets.off();
       }
       

    },[id])

    useEffect(()=>{
        sockets.on('sendMessage',(data)=>{
            setMessages([...messages, data])
            console.log(data.user,data.message)
        })
        return ()=>{
          sockets.off(); // yeh ise liye likhi h kyuki sari array dubara render ho rhi thi pr ab nhi hogi
        }
    },[messages])


  return (
    <div className='chatPage'>
        <div className='chatContainer'>
            <div className='header'>
                <h2>React Chat</h2>
                <a href="/"><img src={closeIcon} alt="Close" /></a>
            </div>
            <ReactScrollToBottom className='chatBox'>
                {messages.map((item,i)=>{return <Message user={item.id===id ? '':item.user} message={item.message} classs={item.id===id?'right':'left'}/>})}
            </ReactScrollToBottom>
            <div className='inputBox'>
                <input type="text" id='chatInput' onKeyDown={(event)=>{event.key === 'Enter' ? send():null}} />
                <button onClick={send} className='sendBtn'><img src={sendLogo} alt="Send" /></button>
            </div>
        </div>
    </div>
  )
}

export default Chat