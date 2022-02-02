import React, { useState } from "react";
import style from "./Style.module.css"
import Section from "../Section/Section";

export default function Timeline({ data }) {
    const [labelData, setLabel] = useState(null)

    const onHover = (lbl, offsetY) => {
        let position = Math.max(0, offsetY - 19)
        setLabel({ text: lbl, position: position })
    }

    return (
        <>
            <div className={style.timeline}
            >
                {data.map((item, i) => {
                    const { label, top, height, text } = item
                    return < Section
                        key={i}
                        onHover={onHover}
                        top={top}
                        height={height}
                        text={text}
                        label={label}>
                    </Section>
                })}
            </div>

            {labelData && <div
                className={style.label}
                style={{ top: labelData.position }}>
                {labelData.text}
            </div >}
        </>
    )
}