import s from './Header.module.css';
import {NavLink} from "react-router-dom";
import userPhoto from "../../assets/images/user.png";


let Header = (props) => {

	debugger

	return(
		<header className = {s.header}>
			<img src="https://www.zastavki.com/pictures/originals/2015/Backgrounds_Lilac_hexagon_on_a_gray_background_098513_.png" alt="" />
			<h1 className = {s.text}>SOCIATY</h1>
			<div className={s.loginBlock}>
				{props.isAuth ? <div className={s.login}>
					<div>
						<img src={props.profile.photos.small
							? props.profile.photos.small
							: userPhoto} alt=""
							 className={s.ProfileImage}/>
					</div>
					{props.login} - <button className={s.button} onClick={props.logout}>
					Log out
				</button></div> : <NavLink to={'/login'}>Login</NavLink>}
			</div>
		</header>
	);
}

export default Header;
