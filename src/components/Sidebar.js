import React, { useState, useEffect } from 'react';
import SidebarChat from './Sidebar_components/SidebarChat';
import './Sidebar.css';
import { Avatar, IconButton } from '@material-ui/core';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchOutlined from '@material-ui/icons/SearchOutlined';
import db from '../firebase';
import { useStateValue } from '../StateProvider';


const Sidebar = () => {
    const [rooms, setRooms] = useState("");
    const [{ user }, dispatch] = useStateValue();

    useEffect(() => {
        const unsubscribe = db.collection('rooms').onSnapshot(snapshot => (
            setRooms(snapshot.docs.map((doc) => (
                {
                    id: doc.id,
                    data: doc.data()
                }
            )))
        ));
        return () => {
            unsubscribe();
        }
    }, []);

    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <Avatar src={user?.photoURL} />
                <div className="sidebar__headerRight">
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>

            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchOutlined />
                    <input type="text" placeholder="Search or start an new chat" />
                </div>
            </div>
            <div className="sidebar__chat">

                <SidebarChat addNewChat />
                {rooms ? rooms.map((room) => {
                    return (
                        <SidebarChat key={room.id} id={room.id} name={room.data.name} />
                    )
                }) :
                    <h5>LOADING...</h5>
                }

            </div>

        </div>
    );
}

export default Sidebar;
