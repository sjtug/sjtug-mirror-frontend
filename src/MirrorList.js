import React from 'react';
import ReactDOM from 'react-dom';
import * as timeago from 'timeago.js';

function MirrorList({ summary }) {
    const rows = Object.entries(summary.WorkerStatus).map(entry => {
        const [key, value] = entry;
        return <tr key={key}>
            <td><a href={`/${key}/`}>{key}</a></td>
            <td>{timeago.format(value.LastFinished, 'zh_CN')}</td>
            <td>{value.Result ? "同步成功" : "同步失败"}</td>
        </tr>
    })
    return <table class="table table-sm table-borderless">
        <thead>
            <tr>
                <th scope="col">镜像名称</th>
                <th scope="col">上次同步</th>
                <th scope="col">同步状态</th>
            </tr>
        </thead>
        <tbody>{rows}</tbody>
    </table>
}

export default MirrorList;
