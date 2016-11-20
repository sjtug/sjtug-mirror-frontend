<template>
    <div class="row">
        <div class="col s12">
            <h4>镜像列表</h4>
        </div>

        <div id="list" class="col s12">

            <table class="highlight centered">
                <thead>
                    <tr>
                        <th data-field="name">镜像名称</th>
                        <th data-field="last-sync">更新时间</th>
                    </tr>
                </thead>

                <tbody id="sync-status">
                    <tr v-for="repo in repos">
                        <td>
                            <a v-bind:href="mirror_baseurl + repo.name">{{repo.display_name}}</a>
                        </td>
                        <td>
                            {{repo.last_sync}}
                            <span v-bind:class="repo.status_class">
                                {{repo.status}}
                            </span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="col s12">
            <h5>说明</h5>
            <ul>
                <li>所有更新时间均为UTC +0。</li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
.sync-finished
{
    visibility: hidden;
}
.sync-working
{
    color:#fff;
    background-color:#26a69a;
    border-radius:5px;
    position: relative;
    padding: 5px;
}
.sync-failed
{
    color:#fff;
    background-color:#e65100;
    border-radius:5px;
    position: relative;
    padding: 5px;
}

i.svg
{
    margin-left: 0.5em;
    cursor: pointer;
}
</style>
<script>
import config from './config';
import state from './state';

export default {
    data() {
        return {
            mirror_baseurl: config.mirrorBaseUrl,
            repos: state.mirrorList,
        };
    },
};
</script>
