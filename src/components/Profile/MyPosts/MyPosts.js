import s from './MyPosts.module.css';
import Post from './Post/Post.js';
import React from 'react';
import {useForm} from "react-hook-form";

const MyPosts = React.memo(props => {

        let postElements = props.posts
            .map(p => <div className={s.post}><Post
                message={p.message}
                countLike={p.countLike}/></div>)


        let addNewPostText = (value) => {
            props.addPost(value.newPostText);
        }

        return (
            <div className={s.postsBlock}>
                <div className={s.public}>
                    <MyPostsForm onSubmit={addNewPostText}/>
                </div>
                <div>
                    {postElements}
                </div>
            </div>
        );
    }
)

let MyPostsForm = (props) => {
    const {register, errors, handleSubmit} = useForm();

    return (
        <form onSubmit={handleSubmit(props.onSubmit)}>
            <div>
                <textarea name={'newPostText'}
                          ref={register({
                              required: true
                          })}
                          placeholder='Что у вас нового?'/>
                {errors.newPostText && <h1>"Введите сообщение!"</h1>}
            </div>
            <div>
                <button className={s.button}>Опубликовать</button>
            </div>
        </form>
    )
}


export default MyPosts;