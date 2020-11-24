import logo from "./assets/sjtug.svg";
import { BsChatDots, BsEnvelope, BsBoxArrowUpRight } from "react-icons/bs";
import Row from "react-bootstrap/Row";

export default function Footer() {
  let mirrorName = "";
  if (window.location.hostname.startsWith("ftp.sjtu")) {
    mirrorName = "Siyuan";
  } else {
    mirrorName = "Zhiyuan";
  }

  return (
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
                  上海交通大学 Linux 用户组 (SJTUG) <BsBoxArrowUpRight />
                </a>{" "}
                维护
              </li>
              <li>
                由{" "}
                <a href="https://net.sjtu.edu.cn">
                  上海交通大学网络信息中心 <BsBoxArrowUpRight />
                </a>{" "}
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
                    <BsChatDots /> 反馈 Bug / 提交新镜像请求
                  </a>
                </li>
                <li>
                  <a href="mailto:sjtug-mirror-maintainers@googlegroups.com">
                    <BsEnvelope /> 邮件联系镜像源管理员
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </Row>
      </div>
    </footer>
  );
}
