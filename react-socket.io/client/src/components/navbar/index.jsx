import React from 'react';
import Notification from "../../img/notification.svg";
import Message from '../../img/message.svg'
import Settings from '../../img/settings.svg'
import './navbar.css';
const Navbar = ({ socket }) => {
    const [notifications, setNotifications] = React.useState([]);
    const [messeges, setMessages] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    React.useEffect(() => {
        socket.on("getNotification", data => {
            setNotifications(prev => [...prev, data])
        })
        socket.on("getMessage", data => {
            setMessages(prev => [...prev, data])
        })
    }, [socket])
    // console.log(messeges)
    // console.log(notifications)
    const displayNotification = ({ senderName, type }) => {
        let action;
        if (type === 1) {
            action = 'liked'
        }
        else if (type === 2) {
            action = 'commented'
        }
        else {
            action = 'shared'
        }
        return (
            <span className="notification">
                {`${senderName} ${action} your post`}
            </span>
        )
    }
    return (
        <div className="navbar">
            <span className="logo">React-Socket.io</span>
            <div className="icons">
                <div className="icon" onClick={() => setOpen(!open)}>
                    <img src={Notification} className="iconImg" alt="" />
                    {
                        notifications.length > 0 && <div className="counter">{notifications.length}</div>
                    }
                </div>
                <div className="icon">
                    <img src={Message} className="iconImg" alt="" />
                    <div className="counter">2</div>
                </div>
                <div className="icon">
                    <img src={Settings} className="iconImg" alt="" />
                    <div className="counter">2</div>
                </div>
            </div>
            {
                open && <div className="notifications">
                    {
                        notifications.map((item) => displayNotification(item))
                    }
                    {
                        notifications.length > 0 && <button className="nButton" onClick={() => {
                            setNotifications([])
                            setOpen(false)
                        }}>Mark as read</button>
                    }
                   
                </div>
            }
        </div>
    )
}

export default Navbar