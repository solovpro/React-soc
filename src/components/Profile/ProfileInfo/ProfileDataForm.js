import s from "./ProfileInfo.module.css";
import {useForm} from "react-hook-form";

const ProfileDataForm = (props) => {

    const {register, handleSubmit} = useForm({
        defaultValues: props.profile
    });

    return <form className={s.profileInfoAction} onSubmit={handleSubmit(props.onSubmit)}>
        <button className={s.button}>Сохранить</button>
        <div className={s.error}>{props.message ? <div>{props.message}</div> : ''}</div>
        <div className={s.redaction}>Режим редактирования</div>
        <div className={s.margin}>
            <div className={s.name && s.info}>
                <b>Ник:</b> <input className={s.input} ref={register({
                required: true
            })} placeholder={'Введите новый ник'} name={'fullName'}/>
                <hr className={s.hr}/>
            </div>
            <div className={s.info}>
                Поиск работы: <input className={s.input} ref={register({
                required: false
            })} placeholder={''} name={'lookingForAJob'} type={'checkbox'}/>
                <hr className={s.hr}/>
            </div>
            <div className={s.info}>
                <b className={s.b}>Навыки работы:</b> <textarea className={s.input && s.textarea} ref={register({
                required: true
            })} placeholder={''} name={'lookingForAJobDescription'}/>
                <hr className={s.hr}/>
            </div>
            <div className={s.aboutMe && s.info}>
                <b>Обо мне:</b> <textarea className={s.input && s.textarea} ref={register({
                required: true
            })} placeholder={'Расскажите о себе'} name={'aboutMe'}/>
                <hr className={s.hr}/>
            </div>
            <div className={s.contacts}>
                <div className={s.contactsText}><b>Контакты:</b></div>
                <div className={s.contactBlock}>
                    {Object.keys(props.profile.contacts).map(key => {
                        return <div><b>{key}:</b><input className={s.input} ref={register({
                            required: false
                        })} placeholder={key} name={'contacts.' + key}/></div>
                    })}
                </div>
            </div>
        </div>
    </form>
}

export default ProfileDataForm;