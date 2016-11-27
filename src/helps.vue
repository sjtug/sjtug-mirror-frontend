<template>
    <div>
    <ul>
    <template v-for="filename in helpfiles">
    <li><router-link :to="{ name: 'helpContent', params: { title: filename }}">{{ filename }}</router-link></li>
    </template>
    <ul>
    </div>
</template>

<script>

import state from './state';

export default {
    data() {
        return {
            helpfiles: state.helpfiles,
        };
    },
};

</script>
