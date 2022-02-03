import React, { useState, useEffect, useRef } from "react";
import style from "./Style.module.css"
import Section from "../Section/Section";
import _ from 'lodash'
import FloatingLabel from "../FloatingLabel/FloatingLabel";

export default function Timeline({ data, currentYPos = 0, onClick = () => { }, onWheel = () => { } }) {
    const [labelData, setLabel] = useState(null)
    const [yPosDrag, setYPosDrag] = useState(null)
    const [showTimeline, setShowTimeline] = useState(false)
    const isMouseDown = useRef(null)
    const timelineRef = useRef(null)
    const activeDebouncer = useRef(null)
    const timer = useRef(null)

    const onSectionHover = (label, yPos) => {
        let position = Math.max(0, yPos - 22)
        setLabel({ text: label, position: position })
    }

    const handleClick = (event) => {
        const posPerc = getClickPosPercent(event, timelineRef.current)
        if (!_.isNil(posPerc)) onClick(posPerc)
    }

    const handleWheel = (event) => {
        const deltaPerc = getWheelDeltaPercent(event, timelineRef.current)
        if (!_.isNil(deltaPerc)) onWheel(deltaPerc)
    }

    const handleMouseDown = (flag, event) => {
        const isInElem = isInsideElement(event, timelineRef.current)

        if (!flag && !isInElem) setShowTimeline(false)
        if ((flag && isInElem) || !flag)
            isMouseDown.current = flag
    }

    const handleMouseMove = (event) => {
        if (isInsideElement(event, timelineRef.current) || isMouseDown.current || activeDebouncer.current) setShowTimeline(true)
        else setShowTimeline(false)

        if (isMouseDown.current) handleDrag(event)
    }

    const handleDrag = (event) => {
        setYPosDrag(event.clientY - timelineRef.current.getBoundingClientRect().top)

        const deltaPerc = getDraglDeltaPercent(event, timelineRef.current)
        if (!_.isNil(deltaPerc)) onClick(deltaPerc)
    }

    useEffect(() => {
        document.addEventListener('click', handleClick);
        document.addEventListener('wheel', handleWheel);
        document.addEventListener('mousedown', (event) => handleMouseDown(true, event));
        document.addEventListener('mouseup', (event) => handleMouseDown(false, event));
        document.addEventListener('mousemove', handleMouseMove);
        return () => {
            document.removeEventListener('click', handleClick);
            document.removeEventListener('wheel', handleWheel);
            document.removeEventListener('mousedown', (event) => handleMouseDown(true, event));
            document.removeEventListener('mouseup', (event) => handleMouseDown(false, event));
            document.removeEventListener('mousemove', handleMouseMove);
        }
    }, [])

    useEffect(() => {
        if (!currentYPos) return
        setShowTimeline(true)

        clearTimeout(timer.current);
        activeDebouncer.current = true

        timer.current = setTimeout(() => {
            activeDebouncer.current = false
            setShowTimeline(false)
        }, 1500);

    }, [currentYPos])

    return (
        <>
            <div className={`${style.timeline} ${showTimeline ? style.visible : ''}`} ref={timelineRef} >
                {data.map((item, i) => {
                    const { label, top, height, text, type } = item
                    return < Section
                        key={i}
                        isHover={yPosDrag >= top && yPosDrag <= (top + height) ? yPosDrag : null}
                        onHover={onSectionHover}
                        top={top}
                        height={height}
                        text={text}
                        type={type}
                        label={label}>
                    </Section>
                })}
                <div className={style.currentPos} style={{ top: currentYPos }}></div>
            </div>

            {labelData &&
                <div className={`${style.floatingLabel} ${showTimeline ? style.visible : ''}`}>
                    <FloatingLabel yPos={labelData.position} label={labelData.text} />
                </div>

            }
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
    const { left, top, right, height } = timelineRef.getBoundingClientRect()

    if (event.clientX >= left && event.clientX <= right &&
        event.clientY >= top && event.clientY <= (top + height)) {
        return true
    }
    return false
}