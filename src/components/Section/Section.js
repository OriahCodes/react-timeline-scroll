import React, { useState, useRef, useEffect } from "react";
import style from "./Style.module.css"
import BulletMark from "../BulletMark/BulletMark";
import TextMark from "../TextMark/TextMark";
import { MARK_TYPES } from "../TimelineComponent/TimelineComponent";


export default function Section({ top, height, label = '', text = '', type, isHover = false, onHover = () => { } }) {
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

    useEffect(() => {
        if (isHover) onHover(label, isHover)
    }, [isHover])

    return (
        <div className={style.sectionWrapper} ref={sectionRef}>
            < div
                className={style.section}
                style={{ top, height }}>

                <div className={style.mark}>
                    {type === MARK_TYPES.TEXT ? <TextMark text={text} /> :
                        type === MARK_TYPES.BULLET ? <BulletMark />
                            : null}
                </div>

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
