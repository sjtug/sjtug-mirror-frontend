<style scoped>
body {
    background-color: blue;
}
</style>

<template>
    <div class="ui"> {{msg}} </div>
</template>

<script>
export default {
    data() {
        return { msg: 'hello world' };
    },
};
</script>
