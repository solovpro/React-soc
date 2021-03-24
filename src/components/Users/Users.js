import s from "./Users.module.css";
import React from 'react';
import Paginator from "../common/Paginator/Paginator";
import User from "./User";


let Users = (props) => {

    return (
        <div className={s.contentUsers}>
            <div>
                <Paginator className={s.paginator} currentPage={props.currentPage}
                           totalItemsCount={props.totalUsersCount} pageSize={props.pageSize}
                           onPageChanged={props.onPageChanged} portionSize={props.portionSize}/>
            </div>
            {
                props.users.map(u => <User user={u} key={u.id} followingInProgress={props.followingInProgress}
                                           unfollow={props.unfollow} follow={props.follow}/>
                )}
        </div>
    )
}

export default Users;