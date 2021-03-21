import React from 'react';
import {
    follow,
    requiestUsers,
    setCurrentPage,
    toggleFollowingProgress,
    unfollow
} from '../../redux/users-reducer';
import {connect} from 'react-redux';
import Users from './Users';
import Preloader from "../common/Loading/Loading";
import {compose} from "redux";
import {
    getCurrentPage,
    getFollowingInProgress, getIsAuth,
    getIsFetching,
    getPageSize, getPortionSize,
    getTotalUsersCount, getUsers
} from "../../redux/user-selectors";


class UsersContainer extends React.Component {

    componentDidMount() {
        const {page, pageSize} = this.props;
        this.props.requiestUsers(page, pageSize);
    }

    onPageChanged = (pageNumber) => {
        const {pageSize} = this.props;
        this.props.setCurrentPage(pageNumber);
        this.props.requiestUsers(pageNumber, pageSize);
    }

    render() {

        return <>
            {this.props.isFetching ?
                <Preloader /> : null}
            <Users totalUsersCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize}
                   currentPage={this.props.page}
                   onPageChanged={this.onPageChanged}
                   users={this.props.users}
                   follow={this.props.follow}
                   unfollow={this.props.unfollow}
                   followingInProgress={this.props.followingInProgress}
                   portionSize={this.props.portionSize}
            />
        </>
    }
}

let mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        page: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
        isAuth: getIsAuth(state),
        portionSize: getPortionSize(state)
    }
}

export default compose(
    connect(mapStateToProps, {follow, unfollow, setCurrentPage, toggleFollowingProgress, requiestUsers})(UsersContainer)
)