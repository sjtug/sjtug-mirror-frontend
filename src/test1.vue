<style scoped>
.ui {
    background-color: blue;
}
</style>

<template>
    <div class="ui"> {{msg}} <icon name="material-add"></icon></div>
</template>

<script>
    const icon = require('vue-materialize/icon');
    
    export default {
        components: {
            icon,
        },
        props: {
            msg: {
                default: 'Default message missing',
            },
        },
    };
</script>
