import s from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem.js';
import Message from './Message/Message.js';
import React from 'react';
import {Redirect} from 'react-router-dom';
import {useForm} from "react-hook-form";

const Dialogs = (props) => {

    let state = props.dialogsPage;

    let dialogsElements = state.dialogs
        .map(d => <DialogItem name={d.name} key={d.id} id={d.id}/>);
    let messagesElements = state.messages
        .map(m => <Message message={m.message} key={m.id}/>)

    if (!props.isAuth) {
        return <Redirect to={'/login'}/>
    }

    let addNewMessage = (values) => {
        props.sendMessage(values.newMessageBody);
    }

    return (
        <div className={s.content}>
            <div className={s.dialogs}>
                <div className={s.dialogsItems}>
                    {dialogsElements}
                </div>
                <div className={s.messages}>
                    <div>{messagesElements}</div>
                </div>
            </div>
            <AddMessageForm onSubmit={addNewMessage}/>
        </div>
    );
}

const AddMessageForm = (props) => {
    const {register, errors, handleSubmit} = useForm();

    return (
        <form onSubmit={handleSubmit(props.onSubmit)}>
            <div>
                <textarea name={'newMessageBody'}
                          ref={register({
                              required: true
                          })}
                          placeholder='Enter your message'/>
                {errors.newMessageBody && <h1>"Введите сообщение!"</h1>}
            </div>
            <div>
                <button className={s.button}>Отправить сообщение</button>
            </div>
        </form>
    )
}


export default Dialogs;
