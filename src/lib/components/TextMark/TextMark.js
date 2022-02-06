import React from "react";
import style from "./Style.module.css"

export default function TextMark({ className = '', text = '', children }) {

    return (
        <>
            <div className={`${className} ${style.text}`}>{text}</div>
            {children}
        </>
    )
}