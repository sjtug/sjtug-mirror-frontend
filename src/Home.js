import useData from "./utils";
import { useMirrorHelp, useMirrorNews } from "./utils";
import MirrorList from "./MirrorList";
import MirrorNews from "./MirrorNews";
import Navbar from "./Navbar";

import mapValues from "lodash/mapValues";
import assign from "lodash/assign";
import map from "lodash/map";
import includes from "lodash/includes";

import logo from "./assets/sjtug.svg";

import Row from "react-bootstrap/Row";

import { BsChatDots, BsEnvelope } from "react-icons/bs";

function transform(status, base, server) {
  return mapValues(status, (v, k) => ({
    idle: v.Idle,
    lastFinished: v.LastFinished,
    result: v.Result,
    url: `${base}/${k}/`,
    server: server,
  }));
}

function Home() {
  const { data: summary1 } = useData(
    "http://mirrors.internal.skyzh.xyz/lug/v1/manager/summary"
  );
  const { data: summary2 } = useData(
    "https://mirrors.sjtug.sjtu.edu.cn/lug/v1/manager/summary"
  );

  const summary1t = transform(
    (summary1 || {}).WorkerStatus || {},
    "http://mirrors.internal.skyzh.xyz",
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

  let mirrorName = "";
  if (window.location.hostname.startsWith("mirrors.internal")) {
    mirrorName = "Siyuan";
  } else {
    mirrorName = "Zhiyuan";
  }

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
          </div>
        </Row>
      </div>
      <footer className="bg-light py-5">
        <div className="container">
          <Row>
            <div className="col-3 p-1">
              <img src={logo} alt="SJTUG Logo" className="w-100" />
            </div>
            <div className="col-9 col-md-5 d-flex align-items-center">
              <ul className="list-unstyled list-footer">
                <li>
                  <b>SJTUG {mirrorName} Mirror</b>
                </li>
                <li>
                  由{" "}
                  <a href="https://sjtug.org">
                    上海交通大学 Linux 用户组 (SJTUG)
                  </a>{" "}
                  维护
                </li>
                <li>
                  由{" "}
                  <a href="https://net.sjtu.edu.cn">上海交通大学网络信息中心</a>{" "}
                  赞助资源
                </li>
                <li>沪交 ICP 备 20180085</li>
              </ul>
            </div>
            <div className="col-md-4 p-3 d-md-flex align-items-center text-md-left text-center">
              <div className="pl-md-5">
                <ul className="list-unstyled list-footer">
                  <li>
                    <a
                      href="https://github.com/sjtug/mirror-requests/issues/new/choose"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <BsChatDots /> 反馈Bug/提交新镜像请求
                    </a>
                  </li>
                  <li>
                    <a href="mailto:sjtug-mirror-maintainers@googlegroups.com">
                      <BsEnvelope /> 给我们发送邮件
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </Row>
        </div>
      </footer>
    </>
  );
}

export default Home;
