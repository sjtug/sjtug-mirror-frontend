import './App.css';
import useData from './utils';
import MirrorList from './MirrorList';

function App() {
  const { data: summary } = useData("/lug/v1/manager/summary");
  if (summary) {
    return (
      <div className="container my-3">
        <h4>SJTUG Siyuan Mirror / Simple Mode</h4>
        <MirrorList summary={summary}></MirrorList>
      </div>
    );
  } else {
    return <div></div>
  }
}

export default App;
