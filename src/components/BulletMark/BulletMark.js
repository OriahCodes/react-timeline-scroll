import React from "react";
import style from "./Style.module.css"

export default function BulletMark({ className = '', children }) {

    return (
        <>
            <div className={`${className} ${style.bullet}`} />
            {children}
        </>
    )
}