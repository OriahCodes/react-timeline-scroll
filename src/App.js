import './App.css';
import TimelineComponent from './components/TimelineComponent/TimelineComponent';
import style from "./Style.module.css"
import TextMark from './components/TextMark/TextMark';
import ContentBox from './components/ContentBox/ContentBox';
import BulletMark from './components/BulletMark/BulletMark';

export const MARK_TYPES = {
  BULLET: 'bullet',
  TEXT: 'text'
}

function App() {
  return (
    <div className="App">
      <TimelineComponent className={style.contentWrapper}>
        <ContentBox label='Feb 2019' >   Feb 2019  </ContentBox>
        <ContentBox label='Feb 2019' type='text' mark={'2019'} className={style.dummyContent} />

        <ContentBox label='Dec 2018'>Dec 2018</ContentBox>
        <ContentBox label='Dec 2018' type={MARK_TYPES.BULLET} className={style.dummyContent} />

        <ContentBox label='Jan 2018' >      Jan 2018   </ContentBox>
        <ContentBox label='Jan 2018' type='text' mark={'2018'} className={style.dummyContent} />
      </TimelineComponent>
    </div>
  );
}

export default App;
