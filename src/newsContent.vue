<template>
    <div>
        {{ news.title }}
        <div v-html='news.content'></div>
    </div>
</template>

<script>
import state from './state';

export default {
    data() {
        return {
            news: state.news[this.$route.params.title],
        };
    },
};

</script>
