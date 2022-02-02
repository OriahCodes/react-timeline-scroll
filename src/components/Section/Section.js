import React, { useState, useRef, useEffect } from "react";
import style from "./Style.module.css"


export default function Section({ top, height, label = '', text = '', onHover = () => { } }) {
    const sectionRef = useRef(null)

    const onMouseMove = (event) => {
        const pos = getLabelPos(event, sectionRef.current, top, height)
        if (pos) onHover(label, pos)
    }

    useEffect(() => {
        document.addEventListener('mousemove', onMouseMove);
        return () => {
            document.removeEventListener('mousemove', onMouseMove);
        }
    }, [])

    return (
        <div className={style.sectionWrapper} ref={sectionRef}>
            < div
                className={style.mark}
                style={{ top, height }}>
                {text ? text : '.'}
            </div>
        </div>
    )
}

function getLabelPos(event, sectionRef, sectionMargin, sectionHeight) {
    const { left, top, right } = sectionRef.getBoundingClientRect()
    const parentMargin = sectionRef.parentElement.getBoundingClientRect().top
    if (event.clientX >= left && event.clientX <= right &&
        event.clientY >= (top + sectionMargin) && event.clientY <= (top + sectionMargin + sectionHeight)) {
        return event.clientY - parentMargin
    }
    return null
}
