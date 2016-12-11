<template>
    <div class="row">
        <div class="col s12 l8">
            <mirrorlist></mirrorlist>
        </div>
        <div class="col s12 l4">
            <h2 class="news-title">近期新闻</h2>
            <ul>
                <template v-for="n in newsfiles">
                <newsbox v-bind:news="n"><newsbox>
                </template>
            </ul>
        </div>
    </div>
</template>


<script>
import mirrorlist from './mirrorlist.vue';
import newsbox from './newsbox.vue';
import state from './state';

export default {
    components: {
        mirrorlist,
        newsbox,
    },
    data() {
        return {
            newsfiles: state.newsfiles,
        };
    },
};
</script>
