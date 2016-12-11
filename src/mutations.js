import { markdown } from 'markdown';
import 'whatwg-fetch';
import Vue from 'vue';
import config from './config';
import state from './state';

export default {
    updateMirrorList() {
        if (config.statusVer === 'lug-v0') {
            this.updateML_lugv0();
        } else if (config.statusVer === 'legacy') {
            this.updateML_legacy();
        } else {
            console.log('updateMirrorList: unknown statusVer in config');
        }
    },

    updateML_lugv0() {
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

    updateML_legacy() {
        const fetched = fetch(config.statusUrl).then(response => response.json());
        fetched.catch((error) => {
            console.log(error.message);
        });
        fetched.then((j) => {
            state.mirrorList.splice(0);
            j.forEach((repo) => {
                let statusClass = '';
                let status = '';
                if (repo.status === 'success') {
                    statusClass = 'sync-finished';
                    status = 'Idle'; // Hidden text
                } else if (repo.status === 'syncing') {
                    statusClass = 'sync-working';
                    status = 'Syncing';
                } else if (repo.status === 'failed') {
                    statusClass = 'sync-failed';
                    status = 'Failed';
                } else {
                    statusClass = 'sync-failed';
                    status = 'Unknown';
                }
                // prettify the date string
                const lastSync = repo.last_update;
                state.mirrorList.push({
                    name: repo.name,
                    display_name: repo.name,
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
