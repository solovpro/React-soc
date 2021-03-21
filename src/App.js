import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar.js';
import {HashRouter, Redirect, Route, Switch} from 'react-router-dom';
import Music from './components/Music/Music.js';
import News from './components/News/News.js';
import Settings from './components/Settings/Settings.js';
import UsersContainer from "./components/Users/UsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/common/Loading/Loading";
import store from "./redux/redux-store";
import {withSuspense} from "./hoc/WithSuspense";

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer.js'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer.js'));


class App extends React.Component {
    /*catchAllUnhandledErrors = (reason, promise) => {
        alert('123');
    }*/

    componentDidMount() {
        this.props.initializeApp();
        window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors);
    }

    componentWillUnmount() {
        window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors);
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }


        return (
            <div className='app-wrapper'>
                <HeaderContainer/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    <Switch>
                    <Route exact path='/'
                           render={() => <Redirect to={'/profile'}/>} />
                    <Route path='/profile/:userId?'
                           render={withSuspense(ProfileContainer)}/>
                    <Route path='/dialogs'
                           render={withSuspense(DialogsContainer)}/>
                    <Route path='/news'
                           render={() => <News/>}/>
                    <Route path='/music'
                           render={() => <Music/>}/>
                    <Route path='/settings'
                           render={() => <Settings/>}/>
                    <Route path='/users'
                           render={() => <UsersContainer/>}/>
                    <Route path='/login'
                           render={() => <Login/>}/>
                    <Route path='*'
                           render={() => <div>404 Ошибка</div>}/>
                    </Switch>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized
})

let AppContainer = compose(
    connect(mapStateToProps, {initializeApp})(App)
)

const AppComponent = (props) => {
    return <HashRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </HashRouter>
}

export default AppComponent;


