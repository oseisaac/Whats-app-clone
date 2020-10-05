import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Chat.css'
import { Avatar, IconButton } from '@material-ui/core';
import SearchOutlined from '@material-ui/icons/SearchOutlined';
import AttachFile from '@material-ui/icons/AttachFile';
import MoreVert from '@material-ui/icons/MoreVert';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import db from '../firebase';
import firebase from 'firebase';
import { useStateValue } from '../StateProvider';

const Chat = () => {
    const [seed, setSeed] = useState('');
    const [input, setInput] = useState('');
    const { roomId } = useParams();
    const [roomName, setroomName] = useState("");
    const [messages, setMessages] = useState([]);
    const [{ user }, dispatch] = useStateValue();

    useEffect(() => {
        if (roomId) {
            db.collection('rooms').doc(roomId)
                .onSnapshot(snapshot => {
                    setroomName(snapshot.data().name);
                })

            db.collection('rooms').doc(roomId)
                .collection('messages').orderBy('timestamp', 'asc')
                .onSnapshot(snapshot => {
                    setMessages(snapshot.docs.map((doc) => doc.data()))
                })
        }
    }, [roomId]);

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))

    }, [roomId]);

    const sendMessage = (e) => {
        e.preventDefault();
        console.log(input);
        setInput("");

        db.collection('rooms').doc(roomId).collection('messages')
            .add({
                message: input,
                name: user.displayName,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            })
    }

    // console.log(messages);
    // const next = (new Date(messages[messages.length - 1]?.timestamp?.toDate()));
    // console.log(next);
    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                    <p>last seen{" "}{new Date(messages[messages.length - 1]?.timestamp?.toDate()).toUTCString()}</p>
                </div>

                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>

                </div>
            </div>

            <div className="chat__body">
                {messages.map(message => (
                    <p className={`chat__message ${user.displayName === message.name && 'chat__reciver'}`}>
                        <span className="chat__name">{message.name}</span>
                        {message.message}
                        <span className="timestamp"> {new Date(message.timestamp?.toDate()).toUTCString()}</span>
                    </p>
                ))}
            </div>

            <div className="chat__footer">
                <InsertEmoticonIcon />
                <form action="">
                    <input
                        type="text"
                        value={input} onChange={(e) => (setInput(e.target.value))}
                        placeholder="Type a message" />
                    <button onClick={sendMessage}
                        type="submit">
                        Send a messaage</button>
                </form>
                <MicIcon />
            </div>
        </div>
    );
}

export default Chat;
