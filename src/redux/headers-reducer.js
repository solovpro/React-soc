import {userAPI} from "../api.js/api";

const SET_USER_PROFILE = 'SET_USER_PROFILE';

let initialState = {
    profile: null
}

const headerReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            };
        default:
            return state;
    }
}

export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile})
export const getUserProfileThunk = (userId) => async (dispatch) => {
    let response = await userAPI.getProfile(userId);
    dispatch(setUserProfile(response.data));
}
export default headerReducer;