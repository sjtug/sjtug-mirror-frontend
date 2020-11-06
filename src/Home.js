import { useMirrorHelp, useMirrorNews, useLugSummary } from "./utils";
import MirrorList from "./MirrorList";
import MirrorNews from "./MirrorNews";
import Navbar from "./Navbar";

import mapValues from "lodash/mapValues";
import assign from "lodash/assign";
import map from "lodash/map";
import includes from "lodash/includes";

import Row from "react-bootstrap/Row";

import ExternalLinks from "./ExternalLinks";

function transform(status, base, server) {
  return mapValues(status, (v, k) => ({
    idle: v.Idle,
    lastFinished: v.LastFinished,
    result: v.Result,
    url: `${base}/${k}/`,
    server: server,
  }));
}

function isSiyuan() {
  const hostname = window.location.hostname;
  return hostname.startsWith("mirrors.internal");
}

function Home() {
  const { data: summary1 } = useLugSummary(
    isSiyuan()
      ? "http://mirrors.internal.skyzh.xyz"
      : "https://mirrors.sjtug.sjtu.edu.cn"
  );
  const { data: summary2 } = useLugSummary("https://mirrors.sjtug.sjtu.edu.cn");

  const summary1t = transform(
    (summary1 || {}).WorkerStatus || {},
    isSiyuan()
      ? "http://mirrors.internal.skyzh.xyz"
      : "https://mirrors.sjtug.sjtu.edu.cn",
    "Siyuan"
  );
  const summary2t = transform(
    (summary2 || {}).WorkerStatus || {},
    "https://mirrors.sjtug.sjtu.edu.cn",
    "Zhiyuan"
  );
  const summary_ = summary2t;
  assign(summary_, summary1t);

  const { data: docs_ } = useMirrorHelp();
  let docs = map((docs_ || {}).items || [], "title");

  const summary = mapValues(summary_, (v, k) =>
    assign(v, { docs: includes(docs, k) })
  );

  const { data: news } = useMirrorNews();

  return (
    <>
      <Navbar />
      <div className="jumbotron jumbotron-fluid bg-white">
        <div className="container">
          <h1 className="title-sjtug text-sjtug ">
            让电脑开心的镜像，开了又开。
          </h1>
          <p className="lead">
            稳定、快速、现代的镜像服务。托管于华东教育网骨干节点{" "}
            <b>上海交通大学</b>。
          </p>
        </div>
      </div>
      <div className="container my-3">
        <Row>
          <div className="col-lg-8">
            <h5 className="text-sjtug">镜像列表</h5>
            <MirrorList summary={summary}></MirrorList>
          </div>
          <div className="col-lg-4">
            <h5 className="text-sjtug">镜像源新闻</h5>
            <MirrorNews news={(news || {}).items || []}></MirrorNews>
            <h5 className="text-sjtug mt-5">相关链接</h5>
            <ExternalLinks></ExternalLinks>
          </div>
        </Row>
      </div>
    </>
  );
}

export default Home;
