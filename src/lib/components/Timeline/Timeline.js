import React, { useState, useEffect, useRef } from "react";
import style from "./Style.module.css"
import Section from "../Section/Section";
import _ from 'lodash'
import FloatingLabel from "../FloatingLabel/FloatingLabel";


function debounce() {
    let timeout
    return function (callback, wait) {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            callback()
        }, wait)
    }
}

export default function Timeline({ data, blockMouseEvents = false, currentYPos = 0, onClick = () => { }, onWheel = () => { } }) {
    const [showTimeline, setShowTimeline] = useState(false)
    const [isTimelineHover, setTimelineHover] = useState(false)
    const isMouseDown = useRef(null)
    const timelineRef = useRef(null)
    const floatingLabelRef = useRef(null)
    const activeDebouncer = useRef(null)
    const timer = useRef(null)

    const onSectionHover = (label, yPos) => {
        if (blockMouseEvents) return
        const floatingLabel = floatingLabelRef.current.firstElementChild
        let position = Math.max(0, yPos - 16)
        position = Math.min(position, timelineRef.current.offsetHeight - 16)
        floatingLabel.style.top = `${(position * 100 / timelineRef?.current?.offsetHeight) || 0}%`
        floatingLabel.innerHTML = label
        floatingLabel.padding = '2px' //TODO
    }

    const handleClick = (event) => {
        if (blockMouseEvents) return
        const posPerc = getClickPosPercent(event, timelineRef.current)
        if (!_.isNil(posPerc)) onClick(posPerc)
    }

    const handleWheel = (event) => {
        if (blockMouseEvents) return
        const deltaPerc = getWheelDeltaPercent(event, timelineRef.current)
        if (!_.isNil(deltaPerc)) onWheel(deltaPerc)
    }

    const handleMouseDown = (flag, event) => {
        if (blockMouseEvents) return
        const isInElem = isInsideElement(event, timelineRef.current)
        if (!flag && !isInElem) {
            activeDebouncer.current(() => {
                setShowTimeline(false)
            }, 1500)
        } if ((flag && isInElem)) setShowTimeline(true)

        if ((flag && isInElem) || !flag)
            isMouseDown.current = flag
    }

    const handleMouseMove = (event) => {
        if (blockMouseEvents) return
        let isInside = isInsideElement(event, timelineRef.current)
        setTimelineHover(isInside)

        if (isMouseDown.current || isInside) {
            activeDebouncer.current(() => { setShowTimeline(true) }, 0)
        } else {
            activeDebouncer.current(() => { setShowTimeline(false) }, 1500)
        }

        if (isMouseDown.current) handleDrag(event)
    }

    const handleDrag = (event) => {
        if (blockMouseEvents) return
        // setYPosDrag((event.clientY - timelineRef.current.getBoundingClientRect().top) / timelineRef.current.offsetHeight)
        const deltaPerc = getDraglDeltaPercent(event, timelineRef.current)
        if (!_.isNil(deltaPerc)) onClick(deltaPerc)
    }

    useEffect(() => {
        document.addEventListener('click', handleClick);
        document.addEventListener('wheel', handleWheel);
        document.addEventListener('mousedown', (event) => handleMouseDown(true, event));
        document.addEventListener('mouseup', (event) => handleMouseDown(false, event));
        document.addEventListener('mousemove', handleMouseMove);

        activeDebouncer.current = debounce()
        return () => {
            document.removeEventListener('click', handleClick);
            document.removeEventListener('wheel', handleWheel);
            document.removeEventListener('mousedown', (event) => handleMouseDown(true, event));
            document.removeEventListener('mouseup', (event) => handleMouseDown(false, event));
            document.removeEventListener('mousemove', handleMouseMove);
        }
    }, [])

    useEffect(() => {//
        if (!currentYPos) return
        setShowTimeline(true)

        activeDebouncer.current(() => {
            setShowTimeline(false)
        }, 1500)

    }, [currentYPos])
    return (
        <>
            <div className={`${style.timeline} ${showTimeline ? style.visible : ''}`} ref={timelineRef} id='timeline-scroll-strip'>
                {data.map((item, i) => {
                    const { label, top, height, text, type } = item
                    const timelineHeight = timelineRef?.current?.offsetHeight
                    let hideMark
                    if ((height * timelineHeight) < 15) hideMark = true
                    let currYposPerc = (currentYPos / timelineHeight) || 0
                    return < Section
                        hideMark={hideMark}
                        key={i}
                        onHover={onSectionHover}
                        topPercent={top}
                        heightPercent={height}
                        text={text}
                        type={type}
                        currentYPos={!isTimelineHover && (currYposPerc >= top && currYposPerc <= (top + height)) ? currYposPerc * timelineHeight : null}
                        label={label}>
                    </Section>
                })}
                <div className={style.currentPos} style={{ top: `${(currentYPos * 100 / (timelineRef?.current?.offsetHeight)) || 0}%` }}></div>
            </div>

            <div ref={floatingLabelRef} className={`${style.floatingLabel} ${showTimeline ? style.visible : ''}`}>
                <FloatingLabel />
            </div>

        </>
    )
}

function getClickPosPercent(event, timelineRef) {
    const { left, top, right, height } = timelineRef.getBoundingClientRect()
    const margin = timelineRef.getBoundingClientRect().top

    if (event.clientX >= left && event.clientX <= right &&
        event.clientY >= top && event.clientY <= (top + height)) {
        return (event.clientY - margin) / height
    }
    return null
}

function getWheelDeltaPercent(event, timelineRef) {
    if (isInsideElement(event, timelineRef)) {
        return event.deltaY / timelineRef.getBoundingClientRect().height
    }
    return null
}

function getDraglDeltaPercent(event, timelineRef) {
    const { left, top, right, height } = timelineRef.getBoundingClientRect()
    return (event.clientY - top) / height
}

function isInsideElement(event, timelineRef) {
    if (!timelineRef) return false
    const { left, top, right, height } = timelineRef.getBoundingClientRect()

    if (event.clientX >= left && event.clientX <= right &&
        event.clientY >= top && event.clientY <= (top + height)) {
        return true
    }
    return false
}