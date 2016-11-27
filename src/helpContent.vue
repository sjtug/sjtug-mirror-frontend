<template>
    <div>
        {{ $route.params.title }}
        <div v-html='content'></div>
    </div>
</template>

<script>
import state from './state';

export default {
    data() {
        return {
            content: state.helps[this.$route.params.title],
        };
    },
};

</script>
