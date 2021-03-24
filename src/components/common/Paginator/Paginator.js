import s from "../../Users/Users.module.css";
import cn from 'classnames';
import {useState} from "react";

const Paginator = (props) => {
    let pagesCount = Math.ceil(props.totalItemsCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    let portionCount = Math.ceil(pagesCount / props.portionSize);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1) * props.portionSize + 1;
    let rightPortionPageNumber = portionNumber * props.portionSize;
    let back = '<=';
    let next = '=>';

    return (
        <div className={s.num}>
            <div className={s.paginator}>
                {portionNumber === 1 && <button className={s.button}>{back}</button>}
                {portionNumber > 1 &&
                <button className={s.button} onClick={ () => { setPortionNumber(portionNumber -1) }}>{back}</button>}
            {pages
                .filter( p => p >= leftPortionPageNumber && p <= rightPortionPageNumber )
                .map((p) => {
                return <span className={cn({[s.selectedPage]: props.currentPage === p}, s.pageNumber) || s.number}
                             key = {p}
                             onClick={(e) => {
                                 props.onPageChanged(p)
                             }}>{p}</span>
            })}
                {portionCount > portionNumber && <button className={s.button} onClick={() => {setPortionNumber(portionNumber + 1)}}>{next}</button>}
                {portionCount === portionNumber && <button className={s.lastbutton}>{next}</button>}
            </div>
        </div>
    )
}

export default Paginator;
