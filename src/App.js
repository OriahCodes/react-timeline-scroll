import './App.css';
import TimelineComponent from './components/TimelineComponent/TimelineComponent';
import style from "./Style.module.css"
import TextMark from './components/TextMark/TextMark';
import ContentBox from './components/ContentBox/ContentBox';
import BulletMark from './components/BulletMark/BulletMark';


function App() {
  return (
    <div className="App">
      <TimelineComponent>
        <div className={style.contentWrapper}>
          <ContentBox label='Feb 2019' className={style.contentBox} />
          <TextMark label='Feb 2019' mark={'2019'}>Feb 2019</TextMark>
          <ContentBox label='Dec 2018' className={style.contentBox} />
          <BulletMark label='Dec 2018'>Dec 2018</BulletMark>
          <ContentBox label='Jan 2018' className={style.contentBox} />
          <TextMark label='Jan 2018' mark={'2018'}>Jan 2018</TextMark>
        </div>
      </TimelineComponent>
    </div>
  );
}

export default App;
