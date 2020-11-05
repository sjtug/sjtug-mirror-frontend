import React from "react";
import * as timeago from "timeago.js";
import sortBy from "lodash/sortBy";

import { BsCheck as SvgCheck, BsX as SvgX } from "react-icons/bs";

const STATUS_SUCCESS = 0;
const STATUS_SYNC = 1;
const STATUS_FAILED = 2;

const SYNC_THRESHOLD = 86400 * 1000 * 300;

function getStatus(value) {
  if (!value.idle) {
    return STATUS_SYNC;
  }
  if (!value.result) {
    return STATUS_FAILED;
  }
  if (Date.now() - new Date(value.lastFinished).getTime() > SYNC_THRESHOLD) {
    return STATUS_SYNC;
  }
  return STATUS_SUCCESS;
}

function MirrorList({ summary }) {
  const rows = sortBy(Object.keys(summary)).map((key) => {
    const value = summary[key];
    const status = getStatus(value);
    return (
      <tr key={key}>
        <td>
          <a href={value.url}>{key}</a>
        </td>
        <td>
          {Date.now() - new Date(value.lastFinished).getTime() > SYNC_THRESHOLD
            ? "未知"
            : timeago.format(value.lastFinished, "zh_CN")}
        </td>
        <td>
          <div className="d-flex flex-row align-items-center">
            {status === STATUS_SUCCESS ? (
              <>
                <div className="mx-1 text-success">
                  <SvgCheck />
                </div>
                <div className="text-success">同步成功</div>
              </>
            ) : status === STATUS_FAILED ? (
              <>
                <div className="mx-1 text-warning">
                  <SvgX />
                </div>
                <div className="text-warning">同步失败</div>
              </>
            ) : (
              <>
                <div className="spinner-grow spinner-grow-sm mx-1 text-info"></div>
                <div className="text-info">正在同步</div>
              </>
            )}
          </div>
        </td>
        <td className="small">{`存储@${value.server}`}</td>
      </tr>
    );
  });
  return (
    <table className="table table-sm table-borderless">
      <thead>
        <tr>
          <th scope="col">镜像名称</th>
          <th scope="col">上次同步</th>
          <th scope="col">状态</th>
          <th scope="col">类型</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

export default MirrorList;