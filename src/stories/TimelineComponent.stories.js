import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import TimelineComponent, { ContentBox, MARK_TYPES } from '../lib/index.js';
import style from "../Style.module.css"

storiesOf('TimelineComponent', module)
    .add('with content', () =>
        <div className={`App ${style.appWrapper}`}  >
            <TimelineComponent className={style.contentWrapper}>
                <ContentBox label='Feb 2019' className={style.dummyContent1}>Feb 2019 A</ContentBox>
                <ContentBox label='Feb 2019' type={MARK_TYPES.TEXT} mark={'2019'} className={style.dummyContent1}>Feb 2019 B</ContentBox>

                <ContentBox label='Dec 2018' className={style.dummyContent2} >Dec 2018 A</ContentBox>
                <ContentBox label='Dec 2018' type={MARK_TYPES.BULLET} className={style.dummyContent2} >Dec 2018 B</ContentBox>

                <ContentBox label='Jan 2018' type={MARK_TYPES.TEXT} mark={'2018'} className={style.dummyContent1} >Jan 2018 </ContentBox>
            </TimelineComponent>
        </div>
    )



