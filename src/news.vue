<template>
    <div>
    <ul>
    <template v-for="n in newsfiles">
    <newsbox v-bind:news="n"><newsbox>
    </template>
    </div>
</template>

<script>

import state from './state';
import newsbox from './newsbox.vue';

export default {
    data() {
        return {
            newsfiles: state.newsfiles,
        };
    },
    components: {
        newsbox,
    },
};

</script>
