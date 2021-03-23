import s from './Profile.module.css';
import MyPostsContainer from './MyPosts/MyPostsContainer.js';
import ProfileInfo from './ProfileInfo/ProfileInfo.js';
import React from "react";

const Profile = (props) => {

    return (
        <div className={s.content}>
            <ProfileInfo profile={props.profile} status={props.status}
                         updateStatus={props.updateStatus} isOwner={props.isOwner}
                        savePhoto={props.savePhoto} saveProfile={props.saveProfile}
                         error={props.error}/>
            <MyPostsContainer/>
        </div>
    );
}

export default Profile;