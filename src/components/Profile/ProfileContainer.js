import Profile from "./Profile";
import React from "react";
import {connect} from "react-redux";
import {getStatus, getUserProfileThunk, savePhoto, saveProfile, updateStatus} from '../../redux/profile-reducer'
import {withRouter} from "react-router";
import {compose} from "redux";

class ProfileContainer extends React.Component {

    refreshProfile() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = this.props.myUserId;
            if (!userId) {
                this.props.history.push('/login');
            }
        }
        this.props.getUserProfileThunk(userId);
        this.props.getStatus(userId);
    }

    componentDidMount() {
        this.refreshProfile();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.match.params.userId !== this.props.match.params.userId) {
            this.refreshProfile();
        }
    }

    render() {
        return (
            <Profile profile={this.props.profile}
                     isOwner={!this.props.match.params.userId}
                     status={this.props.status}
                     updateStatus={this.props.updateStatus}
                     savePhoto={this.props.savePhoto}
                     saveProfile={this.props.saveProfile}
                     message={this.props.message}/>
        );
    }
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    myUserId: state.auth.userId,
    isAuth: state.auth.isAuth,
    message: state.auth.message
});


let composeFunc = compose(
    withRouter
)(ProfileContainer);

export default connect(mapStateToProps,
    {getUserProfileThunk, getStatus, updateStatus, savePhoto, saveProfile})(composeFunc);

