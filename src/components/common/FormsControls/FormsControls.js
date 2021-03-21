import React from "react";
import {useForm} from "react-hook-form";

export const Textarea = (props) => {
    debugger
    const {register, errors} = useForm();
    return (
        <div>
            <textarea name={'newPostText'}
                      ref={register({
                          required: true,
                          maxLength: 30
                      })}
                      placeholder='Post message'/>
            {errors.newPostText && alert("Input message")}
        </div>
    )
}