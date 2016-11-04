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
                        <th data-field="status">状态</th>
                    </tr>
                </thead>

                <tbody id="sync-status">
                    <tr>
                        <td>
                            <a class="tooltip tooltipstered" href="https://mirrors.sjtug.org/PuTTY">PuTTY</a> 
                        </td>
                        <td>
                            <span class="sync-finished">Last Sync: 2016-10-09 13:14:33 
                            </span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style scoped>
.sync-finished
{
    min-width:3rem;
    padding:0 6px;
    text-align:center;
    font-size:1rem;
    line-height:inherit;
    color:#757575;
    position:relative;
    right:15px;
    box-sizing:border-box;
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
import 'materialize-css/bin/materialize.css';
import tooltip from 'vue-materialize/tooltip';

console.log(tooltip);

export default {
    components: {
        tooltip,
    },
};
</script>
