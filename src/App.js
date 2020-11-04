import './App.css';
import useData from './utils';
import MirrorList from './MirrorList';

function App() {
  const { data: summary } = useData("/lug/v1/manager/summary");
  const { data: summary2 } = useData("https://mirrors.sjtug.sjtu.edu.cn/lug/v1/manager/summary");
  const defaultSummary = { WorkerStatus: {} };
  if (summary || summary2) {
    return (
      <div className="container my-3">
        <h4>SJTUG Siyuan Mirror / 简单模式 (本服务器)</h4>
        <MirrorList summary={summary || defaultSummary}></MirrorList>
        <h4>SJTUG Zhiyuan Mirror / 简单模式</h4>
        <MirrorList summary={summary2 || defaultSummary}></MirrorList>
      </div>
    );
  } else {
    return <div></div>
  }
}

export default App;
