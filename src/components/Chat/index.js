import React from 'react';
import styles from './Chat.module.css';
import ChatItem from './ChatItem';

const Chat = (props) => {
    const messageArray = props.dialog.map((msg) => <ChatItem msg={msg} key={msg.id} />)

    return (
        <div className={styles.container}>
            {messageArray}
        </div>
    );
}

export default Chat;
