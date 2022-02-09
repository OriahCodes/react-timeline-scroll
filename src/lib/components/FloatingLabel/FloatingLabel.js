import React from "react";
import style from "./Style.module.css"

export default function FloatingLabel({ className = '', label = undefined, yPos = 0 }) {

    return (
        <div id='floating-label'
            className={`${className} ${style.label}`}
            style={{ top: yPos }}>
            {label}
        </div >
    )
}