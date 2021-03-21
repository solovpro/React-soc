import React from "react";
import s from './Login.module.css';
import {useForm} from 'react-hook-form';
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";


const Login = (props) => {

    const onSubmit = (data) => {
        props.login(data.email, data.password, data.rememberMe, data.captcha);
    }

    if (props.isAuth) {
        return <Redirect to={'/profile'}/>
    }

    return (
        <div className={s.div}>
            <h1 className={s.login}>Login</h1>
            <LoginForm onSubmit={onSubmit} message={props.message} captchaUrl={props.captchaUrl}/>
        </div>
    )
}


const LoginForm = (props) => {

    const {register, errors, handleSubmit} = useForm();

    return (
        <form onSubmit={handleSubmit(props.onSubmit)}>
            <div className={s.input}>
                <input ref={register({
                    required: true
                })} placeholder={'Email'} name={'email'}/>
                {errors.email && <h1>"Введите логин!"</h1>}
            </div>
            <div className={s.input}>
                <input ref={register({
                    required: true
                })} placeholder={'Password'} name={'password'} type={'password'}/>
                {errors.password && <h1>"Введите пароль!"</h1>}
            </div>
            <div className={s.error}>{props.message ? <div>{props.message}</div> : ''}</div>
            <div className={s.input}>
                <input ref={register} type={'checkbox'} name={'rememberMe'}/>
                <div className={s.rememberMe}>remember me</div>
            </div>
            <div>
                {props.captchaUrl &&
                <img src={props.captchaUrl} alt={''}/>}
            </div>
            <div>
                {props.captchaUrl &&
                <input ref={register({
                    required: true
                })} placeholder={'Captcha'} name={'captcha'}/>}
            </div>
            }
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    message: state.auth.message,
    captchaUrl: state.auth.captchaUrl
})

export default connect(mapStateToProps, {login})(Login);