import {authAPI, securityAPI} from "../api.js/api";

const SET_USER_DATA = '/auth/SET_USER_DATA';
const GET_ERROR = '/auth/GET_ERROR';
const GET_CAPTCHA_URL_SUCCESS = '/auth/GET_CAPTCHA_URL_SUCCESS';
const GET_NOT_ERROR = 'GET_NOT_ERROR';

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    message: '',
    captchaUrl: null
}

const authReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data
            };
        case GET_ERROR:
            return {
                ...state,
                message: action.message
            };
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                captchaUrl: action.captchaUrl
            };
        case GET_NOT_ERROR:
            return {
                ...state,
                message: ''
            };
        default:
            return state;
    }
}


export const setAuthUserData = (userId, email, login, isAuth) => ({
    type: SET_USER_DATA,
    data: {userId, email, login, isAuth}
})
export const getCaptchaUrlSuccess = (captchaUrl) => ({
    type: GET_CAPTCHA_URL_SUCCESS,
    captchaUrl
})
export const getError = (message) => ({type: GET_ERROR, message})
export const getNotError = (message) => ({type: GET_NOT_ERROR, message})

export const getAuthUserDataThunk = () => async (dispatch) => {
    let response = await authAPI.me();

    if (response.data.resultCode === 0) {
        let {id, email, login} = response.data.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
}
export const login = (email, password, rememberMe, captcha) => async (dispatch) => {
    let response = await authAPI.login(email, password, rememberMe, captcha);

    if (response.data.resultCode === 0) {
        dispatch(getAuthUserDataThunk());
        dispatch(getNotError(response.data.messages ? response.data.messages[0] : ''));
    } else {
        if (response.data.resultCode === 10) {
            dispatch(getCaptchaUrl());
        }
        dispatch(getError(response.data.messages ? response.data.messages[0] : ''));
    }
}
export const logout = () => async (dispatch) => {
    let response = await authAPI.logout();

    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
    }
}
export const getCaptchaUrl = () => async (dispatch) => {
    let response = await securityAPI.getCaptchaUrl();
    const captchaUrl = response.data.url;
    dispatch(getCaptchaUrlSuccess(captchaUrl))
}


export default authReducer;