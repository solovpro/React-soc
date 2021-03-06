import {profileAPI, userAPI} from "../api.js/api";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';
const GET_ERROR_PROFILE_INFO = 'GET_ERROR_PROFILE_INFO';
const GET_NOT_ERROR = 'GET_NOT_ERROR';

let initialState = {
    posts: [
        {id: 1, message: 'Я - гуль', countLike: 200},
        {id: 2, message: 'Hi, how are you?', countLike: 15},
        {id: 3, message: 'It\'s my first post', countLike: 20}
    ],
    profile: null,
    status: '',
    errors: ''
}

const profileReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 5,
                message: action.newPostText,
                countLike: 1
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
            };
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            };
        case SET_STATUS:
            return {
                ...state,
                status: action.status
            };
        case SAVE_PHOTO_SUCCESS:
            return {
                ...state,
                profile: {
                    ...state.profile,
                    photos: action.photos
                }
            };
        case GET_ERROR_PROFILE_INFO:
            return {
                ...state,
                error: action.error
            };
        case GET_NOT_ERROR:
            return {
                ...state,
                error: ''
            };
        default:
            return state;
    }
}


export const addPostActionCreator = (newPostText) => ({type: ADD_POST, newPostText})
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile})
export const setUserStatus = (status) => ({type: SET_STATUS, status})
export const savePhotoSuccess = (photos) => ({type: SAVE_PHOTO_SUCCESS, photos})
export const getErrorProfileInfo = (error) => ({type: GET_ERROR_PROFILE_INFO, error})
export const getNotError = (error) => ({type: GET_NOT_ERROR, error})


export const getUserProfileThunk = (userId) => async (dispatch) => {
    let response = await userAPI.getProfile(userId);
    dispatch(setUserProfile(response.data));
}

export const getStatus = (userId) => async (dispatch) => {
    let response = await profileAPI.getStatus(userId);
    dispatch(setUserStatus(response.data));
}

export const updateStatus = (status) => async (dispatch) => {
    let response = await profileAPI.updateStatus(status);
    if (response.data.resultCode === 0) {
        dispatch(setUserStatus(status));
    }
}
export const savePhoto = (file) => async (dispatch) => {
    let response = await profileAPI.savePhoto(file);
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos));
    }
}
export const saveProfile = (profile) => async (dispatch, getState) => {
    const userId = getState().auth.userId;
    let response = await profileAPI.saveProfile(profile);
    if (response.data.resultCode === 0) {
        dispatch(getUserProfileThunk(userId));
        dispatch(getNotError(response.data.messages ? response.data.messages[0] : ''));
    } else {
        dispatch(getErrorProfileInfo(response.data.messages ? response.data.messages[0] : ''));
        return Promise.reject();
    }
}

export default profileReducer;