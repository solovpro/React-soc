import React from 'react';
import s from './GlobalError.module.css';
import error from '../../assets/images/ошибка.png';

const GlobalError = () => {
    return (
        <div className={s.container}>
            <div className={s.display}>
                <div>
                    <img className={s.img} src={error} alt=""/>
                </div>
                <div className={s.errorText}>
                    Произошла какая-то ошибка!
                    <hr className={s.hr}/>
                </div>
            </div>
        </div>
    );
};

export default GlobalError;