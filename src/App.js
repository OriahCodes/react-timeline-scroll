import './App.css';
import TimelineComponent, { MARK_TYPES } from './components/TimelineComponent/TimelineComponent';
import style from "./Style.module.css"
import ContentBox from './components/ContentBox/ContentBox';


function App() {
  return (
    <div className="App" >
      <TimelineComponent className={style.contentWrapper}>
        <ContentBox label='Feb 2019' type={MARK_TYPES.TEXT} mark={'2019'} className={style.dummyContent}>Feb 2019</ContentBox>

        <ContentBox label='Dec 2018' type={MARK_TYPES.BULLET} className={style.dummyContent}>Dec 2018</ContentBox>

        <ContentBox label='Jan 2018' type={MARK_TYPES.TEXT} mark={'2018'} className={style.dummyContent}>Jan 2018 </ContentBox>
      </TimelineComponent>
    </div>
  );
}

export default App;
