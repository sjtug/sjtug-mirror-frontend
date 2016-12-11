<template>
    <div>
    <ul>
    <template v-for="n in newsfiles">
    <li><router-link :to="{ name: 'newsContent', params: { title: n.filename }}">{{ n.title }}</router-link></li>
    </template>
    </div>
</template>

<script>

import state from './state';

export default {
    data() {
        return {
            newsfiles: state.newsfiles,
        };
    },
};

</script>
