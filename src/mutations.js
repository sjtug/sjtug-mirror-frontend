import { markdown } from 'markdown';
import Vue from 'vue';
import config from './config';
import state from './state';

export default {
    updateMirrorList() {
        const fetched = fetch(config.statusUrl).then(response => response.json());
        fetched.catch((error) => {
            console.log(error.message);
        });
        fetched.then((j) => {
            state.mirrorList.splice(0);
            const o = Object.keys(j.WorkerStatus);
            o.forEach((worker) => {
                const info = j.WorkerStatus[worker];
                const failed = !info.Result;
                const syncing = !failed && !info.Idle;
                let statusClass = '';
                let status = '';
                if (failed) {
                    statusClass = 'sync-failed';
                    status = 'Failed';
                } else if (syncing) {
                    statusClass = 'sync-working';
                    status = 'Syncing';
                } else {
                    statusClass = 'sync-finished';
                    status = 'Idle'; // Hidden text
                }
                // prettify the date string
                const isoDate = new Date(info.LastFinished).toISOString();
                const lastSync = `${isoDate.slice(0, 10)} ${isoDate.slice(11, 16)}`;
                state.mirrorList.push({
                    name: worker,
                    display_name: worker,
                    last_sync: lastSync,
                    status_class: statusClass,
                    status,
                });
            });
        });
    },
    fetchHelps() {
        fetch('/data.json')
            .then(response => response.json())
            .then((data) => {
                state.helpfiles = data.helpfiles;
                for (const filename of data.helpfiles) {
                    fetch(`/helps/${filename}.md`)
                        .then(response => response.text())
                        .then((text) => {
                            Vue.set(state.helps, filename, markdown.toHTML(text));
                        });
                }
            });
    },
    fetchNews() {
        fetch('/data.json')
            .then(response => response.json())
            .then((data) => {
                state.newsfiles = data.newsfiles;
                for (const n of data.newsfiles) {
                    fetch(`/news/${n.filename}.md`)
                        .then(response => response.text())
                        .then((text) => {
                            Vue.set(state.news, n.filename, {
                                title: n.title,
                                data: n.date,
                                content: markdown.toHTML(text),
                            });
                        });
                }
            }
        );
    },
};
