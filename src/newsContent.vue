<template>
    <div>
        <div v-html='content'></div>
    </div>
</template>

<script>
import state from './state';

export default {
    data() {
        return {
            content: state.news[this.$route.params.title].content,
        };
    },
};

</script>
