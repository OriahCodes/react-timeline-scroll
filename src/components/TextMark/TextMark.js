import React from "react";
import style from "./Style.module.css"

export default function TextMark({ className = '', label = '', mark = '', children }) {

    return (
        <div className={className} data-label={label} data-type='timeline-scroll-text-mark' data-text={mark}>
            {children}
        </div>
    )
}