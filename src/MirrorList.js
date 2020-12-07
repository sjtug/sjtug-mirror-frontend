import React from "react";
import * as timeago from "timeago.js";
import sortBy from "lodash/sortBy";
import { BsCloudFill, BsServer } from "react-icons/bs";

import { INTRO } from "./Data";

import {
  BsCheck as SvgCheck,
  BsX as SvgX,
  BsInfoCircleFill,
} from "react-icons/bs";
import { Link } from "react-router-dom";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";

const STATUS_SUCCESS = 0;
const STATUS_SYNC = 1;
const STATUS_FAILED = 2;
const STATUS_PENDING = 3;

const SYNC_THRESHOLD = 86400 * 1000 * 300;

function getStatus(value) {
  if (!value.idle) {
    return STATUS_SYNC;
  }
  if (!value.result) {
    return STATUS_FAILED;
  }
  if (Date.now() - new Date(value.lastFinished).getTime() > SYNC_THRESHOLD) {
    return STATUS_PENDING;
  }
  return STATUS_SUCCESS;
}

function Overlay({ key, value }) {
  let serverString;
  if (value.server === "Zhiyuan") {
    serverString = (
      <span>
        <BsServer />
        <sup>mirrors</sup> 存储于 Zhiyuan Mirror
      </span>
    );
  }
  if (value.server === "Siyuan") {
    serverString = (
      <span>
        <BsServer />
        <sup>mirrors2</sup> 存储于 Siyuan Mirror
      </span>
    );
  }
  if (value.server === "Reverse") {
    serverString = (
      <span>
        <BsCloudFill /> 反向代理
      </span>
    );
  }
  if (value.server === "Intel") {
    serverString = (
      <span>
        <BsCloudFill /> 智能缓存
      </span>
    );
  }
  return (
    <Popover className="ml-3">
      <Popover.Content>
        {serverString}
        <br />
        {INTRO[key]}
      </Popover.Content>
    </Popover>
  );
}

function MirrorList({ summary }) {
  const rows = sortBy(Object.keys(summary)).map((key) => {
    const value = summary[key];
    const status = getStatus(value);
    return (
      <tr key={key}>
        <td>
          <OverlayTrigger
            key={key}
            placement="right"
            overlay={Overlay({ key, value })}
          >
            <a href={value.url}>{key}</a>
          </OverlayTrigger>

          {value.docs ? (
            <Link className="ml-1" to={`/docs/${key}`}>
              <BsInfoCircleFill />
            </Link>
          ) : (
            <></>
          )}
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
                <div className="d-none d-sm-block text-success">同步成功</div>
              </>
            ) : status === STATUS_FAILED ? (
              <>
                <div className="mx-1 text-danger">
                  <SvgX />
                </div>
                <div className="d-none d-sm-block text-danger">同步失败</div>
              </>
            ) : (
              <>
                <div className="spinner-grow spinner-grow-sm mx-1 text-info"></div>
                <div className="d-none d-sm-block text-info">
                  {status === STATUS_PENDING ? "等待同步" : "正在同步"}
                </div>
              </>
            )}
          </div>
        </td>
        {/* <td className="small">{`存储@${value.server}`}</td> */}
      </tr>
    );
  });
  return (
    <table className="table table-sm table-borderless table-hover">
      <thead>
        <tr>
          <th scope="col">名称</th>
          <th scope="col">上次同步</th>
          <th scope="col">状态</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

export default MirrorList;
