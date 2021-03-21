import s from "./Users.module.css";
import {NavLink} from "react-router-dom";
import userPhoto from "../../assets/images/user.png";

let User = (props) => {

    return (
        <div className={s.content}>
                    <span>
                        <div>
                            <NavLink to={'/profile/' + props.user.id}>
                                <img
                                    src={props.user.photos.small != null ? props.user.photos.small : userPhoto}
                                    className={s.userPhoto}
                                    alt=''/>
                            </NavLink>
                        </div>
                        <div>
                            {props.user.followed
                                ? <button className={s.button}
                                          disabled={props.followingInProgress.some(id => id === props.user.id)}
                                          onClick={() => {
                                              props.unfollow(props.user.id);
                                          }}>Unfollow</button>
                                : <button className={s.button}
                                          disabled={props.followingInProgress.some(id => id === props.user.id)}
                                          onClick={() => {
                                              props.follow(props.user.id);
                                          }}>Follow</button>}
                                </div>
                                </span>
            <span>
                            <span>
                                <div>{props.user.name}</div>
                                <div>{props.user.status}</div>
                            </span>
                            <span>
                                <div>{'u.location.county'}</div>
                                <div>{'u.location.city'}</div>
                            </span>
                        </span>
        </div>
    )
}

export default User;