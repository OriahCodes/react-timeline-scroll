import './App.css';
import TimelineComponent, { MARK_TYPES } from './lib/components/TimelineComponent/TimelineComponent';
import style from "./Style.module.css"
import ContentBox from './lib/components/ContentBox/ContentBox';

// NOTE!! appWrapper has to be with position relative!

function App() {
  return (
    <div className={`App ${style.appWrapper}`}  >
      <TimelineComponent className={style.contentWrapper}>
        <ContentBox label='Feb 2019' type={MARK_TYPES.TEXT} mark={'2019'} className={style.dummyContent1}>Feb 2019</ContentBox>

        <ContentBox label='Dec 2018' type={MARK_TYPES.BULLET} className={style.dummyContent2} >Dec 2018</ContentBox>

        <ContentBox label='Jan 2018' type={MARK_TYPES.TEXT} mark={'2018'} className={style.dummyContent1} >Jan 2018 </ContentBox>
      </TimelineComponent>
    </div>
  );
}

export default App;
