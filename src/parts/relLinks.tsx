import {Stack, Text} from "@mantine/core";
import classes from "@/app/global.module.css";
import {MyAnchor} from "@/components/MyAnchor";
import {IconExternalLink} from "@tabler/icons-react";

type Item = [string, string] | string;

const SECTIONS: Item[][] = [
  [
    ["提交新镜像请求 (GitHub)", "https://github.com/sjtug/mirror-requests/issues/new?labels=new-mirror&template=1-mirror-request.md"],
    ["反馈 Bug (GitHub)", "https://github.com/sjtug/mirror-requests/issues/new?labels=bug&template=2-bug-report.md"],
    ["邮件联系镜像源管理员", "mailto:sjtug-mirror-maintainers@googlegroups.com"],
  ],
  ["SJTUG 共设两台服务器。思源服务器同步新镜像，致远服务器兼容原 SJTU 镜像站。它们分别提供不同的软件源镜像服务。请按照本站文档配置相关软件，以取得更好的使用体验。"],
  [
    ["思源 (Siyuan) 镜像服务器", "https://mirror.sjtu.edu.cn"],
    ["致远 (Zhiyuan) 镜像服务器", "https://mirrors.sjtug.sjtu.edu.cn"]
  ],
  ["SJTUG 维护了一批开源项目。"],
  [
    ["镜像基础架构源码", "https://github.com/sjtug/mirror-docker-unified"],
    ["镜像同步管理器", "https://github.com/sjtug/lug"],
    ["镜像站前端", "https://github.com/sjtug/sjtug-mirror-frontend"],
    ["镜像站配置与测试脚本", "https://github.com/sjtug/mirror-test-scripts"],
    ["镜像站文档与 SJTUG 网站源代码", "https://github.com/sjtug/portal"],
    ["mirror-intel 反代缓存工具", "https://github.com/sjtug/mirror-intel"],
    ["mirror-clone 通用镜像工具", "https://github.com/sjtug/mirror-clone"],
    ["rsync-sjtug 对象存储同步工具", "https://github.com/sjtug/rsync-sjtug"],
    ["SJTUThesis LaTeX 模版", "https://github.com/sjtug/SJTUThesis"],
    ["SJTUBeamer LaTeX 模版", "https://github.com/sjtug/SJTUBeamer"],
  ],
];

export const RelLinks = async () => {
  return (
    <Stack gap={"sm"}>
      <Text className={classes.textTitle}>相关链接</Text>
      <Stack gap={"md"}>
        {
          SECTIONS.map((section, i) =>
            <Stack gap={"xxs"} key={i}>
              {
                section.map((item, i) =>
                  Array.isArray(item) ?
                    <MyAnchor className={classes.textSmall} href={item[1]} target="_blank" key={i}
                              rightIcon={<IconExternalLink size={16} stroke={1.5}/>}>
                      <Text inherit>{item[0]}</Text>
                    </MyAnchor>
                    : <Text size={"sm"} key={i}>{item}</Text>
                )
              }
            </Stack>
          )
        }
      </Stack>
    </Stack>
  )
}
