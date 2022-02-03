import React from "react";
import style from "./Style.module.css"

export default function ContentBox({ className = '', label = '', mark = undefined, type, children }) {

    return (
        <div className={className} data-label={label} name='timeline-scroll' data-type={type} data-text={mark}>
            {children}
        </div>
    )
}