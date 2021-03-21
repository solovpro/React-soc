import preloader from "../../../assets/images/preloader.gif";
import React from "react";

let Preloader = (props) => {
    return (
        <div>
            <img src={preloader} alt={''}/>
        </div>
    );
}

export default Preloader;