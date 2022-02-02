import React from "react";
import style from "./Style.module.css"

export default function ContentBox({ className = '', label = '', children }) {

    return (
        <div className={className} data-label={label} data-type='timeline-scroll-content'>
            {children}
        </div>
    )
}