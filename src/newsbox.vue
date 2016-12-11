<template>
    <div class="card">
    <div class="card-content">
    <router-link :to="{ name: 'newsContent', params: { title: news.filename }}">
    {{ news.title }}
    </router-link>
    {{ news.date }}
    </div>
    </div>
</template>

<script>

export default {
    props: ['news'],
};

</script>
