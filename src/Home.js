import useData from "./utils";
import MirrorList from "./MirrorList";
import Navbar from "./Navbar";

import mapValues from "lodash/mapValues";
import assign from "lodash/assign";

import logo from "./assets/logo.png";
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
  if (summary1 || summary2) {
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
    const summary = summary2t;
    console.log(summary1t, summary2t);
    assign(summary, summary1t);

    return (
      <>
        <div className="jumbotron jumbotron-fluid bg-light px-0 pt-0 bg-sjtug text-white">
          <Navbar />
          <div className="container pt-5">
            <h1>稳定、快速、现代的镜像服务</h1>
            <p className="lead">托管于华东教育网骨干节点——上海交通大学</p>
          </div>
        </div>
        <div className="container my-3">
          <MirrorList summary={summary}></MirrorList>
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
                    <b>SJTUG Siyuan Mirror</b>
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
                    <a href="https://net.sjtu.edu.cn">
                      上海交通大学网络信息中心
                    </a>{" "}
                    赞助资源
                  </li>
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
  } else {
    return <div></div>;
  }
}

export default Home;
