import {userAPI} from "../api.js/api";
import {updateObjectInArray} from "../utils/validators/object-helpers";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';


/*var initialState = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []
}*/
var initialState = {

    users: [
        {
            name: 'Bah_Novak',
            id: 15687,
            uniqueUrlName: null,
            photos: {
                small: null,
                large: null
            },
            status: null,
            followed: true
        },
        {
            name: 'Egor423',
            id: 15686,
            uniqueUrlName: null,
            photos: {
                small: null,
                large: null
            },
            status: null,
            followed: true
        },
        {
            name: 'NikTest9911',
            id: 15685,
            uniqueUrlName: null,
            photos: {
                small: null,
                large: null
            },
            status: null,
            followed: true
        },
        {
            name: 'NikTest99',
            id: 15684,
            uniqueUrlName: null,
            photos: {
                small: null,
                large: null
            },
            status: null,
            followed: true
        },
        {
            name: 'NikTest',
            id: 15683,
            uniqueUrlName: null,
            photos: {
                small: null,
                large: null
            },
            status: null,
            followed: true
        }
    ],
    pageSize: 5,
    totalUsersCount: 10695,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [],
    portionSize: 15
}


const usersReducer = (state = initialState, action) => {

    switch (action.type) {
        case FOLLOW: {
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userID, 'id', {followed: true})
            }
        }
        case UNFOLLOW: {
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userID, 'id', {followed: false})
            }
        }
        case SET_USERS: {
            return {
                ...state,
                users: action.users
            }
        }
        case SET_CURRENT_PAGE: {
            return {
                ...state,
                currentPage: action.currentPage
            }
        }
        case SET_TOTAL_USERS_COUNT: {
            return {
                ...state,
                totalUsersCount: action.count
            }
        }
        case TOGGLE_IS_FETCHING: {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }
        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        }
        default:
            return state;
    }
}


export const followSuccess = (userID) => ({type: FOLLOW, userID})
export const unfollowSuccess = (userID) => ({type: UNFOLLOW, userID})
export const setUsers = (users) => ({type: SET_USERS, users})
export const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage})
export const setTotalUsersCount = (totalUsersCount) => ({type: SET_TOTAL_USERS_COUNT, count: totalUsersCount})
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching})
export const toggleFollowingProgress = (isFetching, userId) => ({
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching,
    userId
})

export const requiestUsers = (currentPage, pageSize) => {
    return async (dispatch) => {
        dispatch(toggleIsFetching(true));

        let data = await userAPI.getUsers(currentPage, pageSize);
        dispatch(toggleIsFetching(false));
        dispatch(setUsers(data.items));
        dispatch(setTotalUsersCount(data.totalCount));
    }
}

const followUnfollowFlow = async (dispatch, userId, apiMethod, actionCreator) => {

    dispatch(toggleFollowingProgress(true, userId));
    let response = await apiMethod(userId);

    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(toggleFollowingProgress(false, userId))
}

export const follow = (userId) => {
    return async (dispatch) => {
        followUnfollowFlow(dispatch, userId, userAPI.follow.bind(userAPI), followSuccess);
    }
}

export const unfollow = (userId) => {
    return async (dispatch) => {
        await followUnfollowFlow(dispatch, userId, userAPI.unfollow.bind(userAPI), unfollowSuccess);
    }
}

export default usersReducer;