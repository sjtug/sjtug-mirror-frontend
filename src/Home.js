import { useMirrorHelp, useMirrorNews, useLugSummary } from "./utils";
import MirrorList from "./MirrorList";
import MirrorNews from "./MirrorNews";
import Navbar from "./Navbar";

import mapValues from "lodash/mapValues";
import pickBy from "lodash/pickBy";
import assign from "lodash/assign";
import map from "lodash/map";
import includes from "lodash/includes";

import Row from "react-bootstrap/Row";

import ExternalLinks from "./ExternalLinks";
import {
  BLOCKED_IN_ZHIYUAN,
  HIDDEN,
  REVERSE_PROXY,
  MIRROR_INTEL,
} from "./Data";

function baseOf(server) {
  if (server === "Zhiyuan") {
    return "https://mirrors.sjtug.sjtu.edu.cn";
  }
  if (server === "Siyuan") {
    return "https://mirror.sjtu.edu.cn";
  }
  return "";
}
function filterRepo(status, server) {
  return pickBy(status, (v, k) => {
    if (server === "Zhiyuan") {
      if (includes(BLOCKED_IN_ZHIYUAN, k)) {
        return false;
      }
    }
    if (includes(HIDDEN, k)) return false;
    if (k.startsWith(".")) return false;
    return true;
  });
}

function transform(status, server) {
  return mapValues(filterRepo(status, server), (v, k) => ({
    idle: v.Idle,
    lastFinished: v.LastFinished,
    result: v.Result,
    url: `${baseOf(server)}/${k}/`,
    server: includes(REVERSE_PROXY, k)
      ? "Reverse"
      : includes(MIRROR_INTEL, k)
      ? "Intel"
      : server,
  }));
}

function Home() {
  const { data: summarySiyuan_ } = useLugSummary(baseOf("Siyuan"));
  const { data: summaryZhiyuan_ } = useLugSummary(baseOf("Zhiyuan"));

  const summarySiyuan = transform(
    (summarySiyuan_ || {}).WorkerStatus || {},
    "Siyuan"
  );

  const summaryZhiyuan = transform(
    (summaryZhiyuan_ || {}).WorkerStatus || {},
    "Zhiyuan"
  );

  const summary_ = summaryZhiyuan;
  assign(summary_, summarySiyuan);

  const { data: docs_ } = useMirrorHelp();
  let docs = map((docs_ || {}).items || [], "title");

  const summary = mapValues(summary_, (v, k) =>
    assign(v, { docs: includes(docs, k) })
  );

  const { data: news } = useMirrorNews();

  return (
    <>
      <Navbar />
      <div className="jumbotron jumbotron-fluid bg-transparent">
        <div className="container">
          <h1 className="title-sjtug text-sjtug-gradient">
            稳定、快速、现代的镜像服务。
          </h1>
          <p className="lead">托管于华东教育网骨干节点上海交通大学。</p>
        </div>
      </div>
      <div className="container my-3">
        <Row>
          <div className="col-lg-8">
            <h5>
              <span className="text-sjtug">镜像列表</span>
            </h5>
            <MirrorList summary={summary}></MirrorList>
          </div>
          <div className="col-lg-4">
            <h5 className="text-sjtug">
              <span className="text-sjtug">镜像源新闻</span>
            </h5>
            <MirrorNews news={(news || {}).items || []}></MirrorNews>
            <h5 className="text-sjtug mt-5">
              <span className="text-sjtug">相关链接</span>
            </h5>
            <ExternalLinks></ExternalLinks>
          </div>
        </Row>
      </div>
    </>
  );
}

export default Home;
