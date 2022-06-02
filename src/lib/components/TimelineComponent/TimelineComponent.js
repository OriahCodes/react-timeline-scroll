import React, { useRef, useEffect, useState } from "react";
import style from "./Style.module.css"
import Timeline from "../Timeline/Timeline";
import { buildData } from "./scripts/dataFunctions";

export const MARK_TYPES = {
    BULLET: 'bullet',
    TEXT: 'text'
}

export default function TimelineComponent({ className = '', blockMouseEvents = false, children }) {
    const contentRef = useRef(null)
    const [timelineData, setTimelineData] = useState(null)
    const [scrollTop, setScrollTop] = useState(0)

    useEffect(() => {
        if (!contentRef?.current) return
        const data = buildData(contentRef.current)
        setTimelineData(data)
    }, [contentRef])

    const onClick = (perc) => {
        const updatedScroll = perc * (contentRef.current.scrollHeight - contentRef.current.clientHeight)
        contentRef.current.scrollTop = updatedScroll
    }
    const onWheel = (deltaPerc) => {
        const scrollDelta = deltaPerc * (contentRef.current.scrollHeight - contentRef.current.clientHeight)
        contentRef.current.scrollTop = contentRef.current.scrollTop + scrollDelta
    }

    const onScroll = (event) => {
        const timelineScroll = contentRef.current.offsetHeight * (event.target.scrollTop / (event.target.scrollHeight - event.target.clientHeight))
        setScrollTop(timelineScroll)
    }

    return (
        <div className={style.timelineWrapper} id='timeline-scroll' >
            <div className={className} ref={contentRef} onScroll={onScroll} >
                {children}
            </div>
            {timelineData &&
                <Timeline
                    blockMouseEvents={blockMouseEvents}
                    onClick={onClick}
                    onWheel={onWheel}
                    currentYPos={scrollTop}
                    data={timelineData}
                />}
        </div>
    )
}