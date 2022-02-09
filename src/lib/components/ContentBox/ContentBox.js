import React from "react";
import style from "./Style.module.css"

export default function ContentBox({ className = '', label = '', mark = undefined, type, name, children }) {

    return (
        <div className={className} data-label={label} data-name='timeline-scroll-component' data-type={type} data-text={mark} name={name}>
            {children}
        </div>
    )
}