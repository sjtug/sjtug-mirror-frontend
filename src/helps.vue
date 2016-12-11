<template>
    <div class="collection">
    <template v-for="filename in helpfiles">
    <router-link :to="{ name: 'helpContent', params: { title: filename }}" class="collection-item" active-class="active">{{ filename }}</router-link>
    </template>
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
