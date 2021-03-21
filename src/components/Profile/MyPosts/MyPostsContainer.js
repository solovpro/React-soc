import {addPostActionCreator} from '../../../redux/profile-reducer';
import MyPosts from './MyPosts.js';
import {connect} from "react-redux";
// eslint-disable-next-line no-unused-vars
import React from 'react';

let mapStateToProps = (state) => {
      return{
            posts: state.profilePage.posts
      }
}

let mapDispatchToProps = (dispatch) => {
      return {
            addPost: (newPostText) => {
                  dispatch(addPostActionCreator(newPostText));
            }
      }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;