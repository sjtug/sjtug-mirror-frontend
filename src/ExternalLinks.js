import { BsBoxArrowUpRight } from "react-icons/bs";

export default function ExternalLinks() {
  const linkArray = [
    {
      url: "https://github.com/sjtug/mirror-docker-siyuan",
      name: "思源 (Siyuan) 镜像服务器源码",
    },
    {
      url: "https://github.com/sjtug/mirror-docker",
      name: "致远 (Zhiyuan) 镜像服务器源码",
    },
    { url: "https://github.com/sjtug/lug", name: "镜像同步管理器" },
    {
      url: "https://github.com/sjtug/sjtug-mirror-frontend",
      name: "镜像站前端",
    },
    {
      url: "https://github.com/sjtug/mirror-test-scripts",
      name: "镜像站配置与测试脚本",
    },
    {
      url: "https://github.com/sjtug/portal",
      name: "镜像站文档与 SJTUG 网站源代码",
    },
    { url: "https://github.com/sjtug/SJTUThesis", name: "SJTU XeLaTeX 模版" },
  ];

  return (
    <div>
      <ul className="list-unstyled list-footer mt-3">
        <li>
          <a
            href="https://github.com/sjtug/mirror-requests/issues/new?labels=new-mirror&template=1-mirror-request.md"
            target="_blank"
            rel="noreferrer"
          >
            提交新镜像请求 (GitHub) <BsBoxArrowUpRight />
          </a>
        </li>
        <li>
          <a
            href="https://github.com/sjtug/mirror-requests/issues/new?labels=bug&template=2-bug-report.md"
            target="_blank"
            rel="noreferrer"
          >
            反馈 Bug (GitHub) <BsBoxArrowUpRight />
          </a>
        </li>
        <li>
          <a href="mailto:sjtug-mirror-maintainers@googlegroups.com">
            邮件联系镜像源管理员 <BsBoxArrowUpRight />
          </a>
        </li>
        <li>
          <a href="https://sjtug.org">
            访问 SJTUG 首页 <BsBoxArrowUpRight />
          </a>
        </li>
      </ul>

      <small>
        SJTUG 共设两台服务器。致远服务器同步新镜像，思源服务器兼容原 SJTU
        镜像站。它们分别提供不同的软件源镜像服务。请按照本站文档配置相关软件，以取得更好的使用体验。
      </small>

      <ul className="list-unstyled list-footer mt-3">
        <li>
          <a href="https://mirrors.sjtug.sjtu.edu.cn">
            思源 (Siyuan) 镜像服务器 (建设中) <BsBoxArrowUpRight />
          </a>
        </li>
        <li>
          <a href="https://mirrors.sjtug.sjtu.edu.cn">
            致远 (Zhiyuan) 镜像服务器 <BsBoxArrowUpRight />
          </a>
        </li>
      </ul>

      <small>SJTUG 维护了一批开源项目。</small>
      <ul className="list-unstyled list-footer mt-3">
        {linkArray.map((x) => (
          <li key={x.name}>
            <a href={x.url}>
              {x.name} <BsBoxArrowUpRight />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
