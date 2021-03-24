import {getAuthUserDataThunk} from "./auth-reducer";

const SET_INITIALIZED = 'SET_INITIALIZED';
const SET_GLOBAL_ERROR = 'SET_GLOBAL_ERROR';

let initialState = {
    initialized: false,
    globalError: true
}

const appReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_INITIALIZED:
            return {
                ...state,
                initialized: true
            };
        case SET_GLOBAL_ERROR:
            if (state.globalError) {
                return {
                    ...state,
                    globalError: false
                };
            } else {
                return {
                    ...state,
                    globalError: true
                };
            }
        default:
            return state;
    }
}


export const setInitialized = () => ({type: SET_INITIALIZED});
export const setGlobalError = (globalError) => ({type: SET_GLOBAL_ERROR, globalError});

export const initializeApp = () => (dispatch) => {
    let promise = dispatch(getAuthUserDataThunk());
    Promise.all([promise])
        .then(() => {
            dispatch(setInitialized());
        });
}

export default appReducer;