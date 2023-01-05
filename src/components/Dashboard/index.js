import React, { useEffect, useReducer, useState } from 'react';
import DialogList from '../DialogList';
import Chat from '../Chat';
import MessageArea from '../MessageArea';
import styles from './Dashboard.module.css';
import { UserContext } from '../../contexts';
import { getData } from '../../API';
import { reducer } from '../../reducers';
import CONSTANTS from '../../constants';
const {ACTIONS} = CONSTANTS;

const Dashboard = () => {
    const [user, setUser] = useState({
        id: 1,
        username: "MAIN ADMIN 24",
        imageSrc: 'https://robohash.org/MAIN%20ADMIN%2024?set=set4'
    });

    const [state, dispatch] = useReducer(reducer, {
        messages: []
    })

    useEffect(() => {
        getData()
        .then((data) => {
            dispatch(
                {
                    type: ACTIONS.DATA_LOAD_SUCCESS,
                    data
                }
            )
        })
        .catch((err) => {
            dispatch(
                {
                    type: ACTIONS.DATA_LOAD_ERROR,
                    err
                }
            )
        })
    }, [])

    const createMessage = (text) => {
        const newMessage = {
            body: text,
            id: state.messages.length + 1,
            user
        };
        dispatch({
            type: ACTIONS.ADD_NEW_MESSAGE,
            data: newMessage
        })
    }

    return (
        <UserContext.Provider value={user}>
            <main className={styles.container}>
                <DialogList />
                <section className={styles.wrapper}>
                <Chat dialog={state.messages} />
                <MessageArea submitMessage={createMessage} />
                </section>
            </main>
        </UserContext.Provider>
    );
}

export default Dashboard;
