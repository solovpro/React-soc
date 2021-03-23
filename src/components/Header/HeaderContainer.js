import Header from "./Header";
import React from 'react';
import {connect} from "react-redux";
import {logout} from "../../redux/auth-reducer";

class HeaderContainer extends React.Component {

	render() {
        return (
            <Header {...this.props} profile={this.props.profile}/>
        );
    }
}

let mapStateToProps = (state) => ({
	isAuth: state.auth.isAuth,
	login: state.auth.login,
    profile: state.header.profile
})

export default connect(mapStateToProps, {logout})(HeaderContainer);
