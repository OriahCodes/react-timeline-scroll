import React from "react";
import style from "./Style.module.css"

export default function FloatingLabel({ className = '', label = '', yPos = 0, children }) {

    return (
        <>
            <div
                className={style.label}
                style={{ top: yPos }}>
                {label}
            </div >
            {children}
        </>
    )
}