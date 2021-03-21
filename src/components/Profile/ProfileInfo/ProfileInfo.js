import s from './ProfileInfo.module.css';
import Preloader from "../../common/Loading/Loading";
import userPhoto from "../../../assets/images/user.png";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import {useState} from "react";
import ProfileDataForm from './ProfileDataForm'

const ProfileInfo = (props) => {

    let [editMode, setEditMode] = useState(false);

    if (!props.profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            props.savePhsoto(e.target.files[0]);
        }
    }

    const onSubmit = async (formData) => {
        await props.saveProfile(formData);
        setEditMode(false);
    }

    return (
        <>
            <div className={s.photoInfo}>
                <div className={s.descriptionBlock}>
                    <img src={props.profile.photos.large ? props.profile.photos.large : userPhoto} alt=""
                         className={s.ProfileImage}/>
                    <div className={s.status}><ProfileStatusWithHooks status={props.status}
                                                                      updateStatus={props.updateStatus}/></div>
                    <div className={s.setPhoto}>
                        Сменить фото:{props.isOwner &&
                    <input className={s.input} type="file" onChange={onMainPhotoSelected}/>}
                    </div>
                </div>
                {editMode ? <ProfileDataForm profile={props.profile}
                                             message={props.message}
                                             status={props.status}
                                             updateStatus={props.updateStatus}
                                             onSubmit={onSubmit}
                                             initialValues={props.profile}/>
                    : <ProfileData profile={props.profile}
                                   status={props.status}
                                   updateStatus={props.updateStatus}
                                   isOwner={props.isOwner}
                                   goToEditMode={() => {
                                       setEditMode(true)
                                   }}/>}
            </div>
        </>
    );
}

const ProfileData = (props) => {
    return <div className={s.profileInfo}>
        {props.isOwner && <div onClick={props.goToEditMode}>
            <button className={s.button}>Редактировать</button>
        </div>}
        <div className={s.discript}>Описание профиля:</div>
        <div className={s.margin}>
            <div className={s.name && s.info}>
                <b>Ник:</b> {props.profile.fullName}
                <hr className={s.hr}/>
            </div>
            <div className={s.info}>
                Поиск работы: {props.profile.lookingForAJob? 'ищу' : 'не ищу'}
                <hr className={s.hr}/>
            </div>
            {props.profile.lookingForAJobDescription &&
            <div className={s.info}>
                <b>Навыки работы:</b> {props.profile.lookingForAJobDescription
                ? props.profile.lookingForAJobDescription : '---'}
                <hr className={s.hr}/>
            </div>}
            <div className={s.aboutMe && s.info}>
                <b>Обо мне:</b> {props.profile.aboutMe ? props.profile.aboutMe : '---'}
                <hr className={s.hr}/>
            </div>
            <div className={s.contacts}>
                <div className={s.contactsText}><b>Контакты:</b></div>
                <div className={s.contactBlock}>
                    {Object.keys(props.profile.contacts).map(key => {
                        return <Contact key={key} contactTitle={key} contactValue={props.profile.contacts[key]}/>
                    })}
                </div>
            </div>
        </div>
    </div>
}


export const Contact = ({contactTitle, contactValue}) => {
    return <div className={s.contact}><b>{contactTitle}:</b>{contactValue}</div>
}

export default ProfileInfo;