import s from './../Dialogs.module.css';
import {NavLink} from 'react-router-dom';
import React from "react";

const DialogItem = (props) => {

	let path = '/dialogs/' + props.id
	return(
		<div className = {s.dialog + ' ' + s.active}>
			<NavLink to = {path}>{props.name}</NavLink><hr className={s.hr}/>
		</div>
	);
}

export default DialogItem;