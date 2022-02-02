import React, { useRef, useEffect, useState } from "react";
import style from "./Style.module.css"
import Timeline from "../Timeline/Timeline";
import { buildData } from "./scripts/dataFunctions";

export default function TimelineComponent({ children }) {
    const contentRef = useRef(null)
    const [timelineData, setTimelineData] = useState(null)
    // const [labelData, setLabel] = useState(null)

    useEffect(() => {
        if (!contentRef?.current) return
        const data = buildData(contentRef.current)
        console.log('data', data)
        setTimelineData(data)
    }, [contentRef])

    // const onHover = (lbl, event) => {
    //     if (lbl) {
    //         // debugger
    //         console.log('event.clientY', event.clientY)
    //         setLabel({ text: lbl, position: { x: event.clientX, y: event.clientY } })
    //     }
    //     else setLabel(null)
    // }


    return (
        <>
            <div className={style.timelineWrapper}>
                <div className={style.content} ref={contentRef}>
                    {children}
                </div>
                {timelineData && <Timeline data={timelineData} />}
            </div>
            {/* {labelData && <div
                className={style.label}
                style={{ top: labelData.position.y, left: labelData.position.x + 20 }}>
                {labelData.text}
            </div >} */}
        </>
    )
}