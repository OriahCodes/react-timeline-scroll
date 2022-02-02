import React from "react";
import style from "./Style.module.css"

export default function BulletMark({ className = '', label = '', children }) {

    return (
        <div className={className} data-label={label} data-type='timeline-scroll-bullet-mark'>
            {children}
        </div>
    )
}