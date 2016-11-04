<template>
    <div class="row">
        <div class="col s12 l8">
            <mirrorlist></mirrorlist>
        </div>
        <div class="col s12 l4">
            <h2 class="news-title">近期新闻</h2>
            <ul class="collapsible" id="news" data-collapsible="accordion">
            </ul>
        </div>
    </div>
</template>


<script>
import mirrorlist from './mirrorlist.vue';

export default {
    components: {
        mirrorlist,
    },
};
</script>
