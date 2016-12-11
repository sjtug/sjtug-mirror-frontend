<style scoped>
.help-content {
    height: auto !important;
}
.help-title {
    height: 100px;
}
</style>

<template>
    <div class="help-content card large">
        <div class="card-image amber help-title">
            <span class="card-title">
                {{ $route.params.title }}
            </span>
        </div>
        <div class="card-content" v-html="content">
        </div>
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
