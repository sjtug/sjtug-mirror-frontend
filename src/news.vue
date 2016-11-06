<template>
    <div>
    <template v-for="n in news">
    {{ n.title }}
    {{ n.date }}
    <div v-html="n.content">
    </div>
    <hr>
    </template>
    </div>
</template>

<script>

import { markdown } from 'markdown';
import 'whatwg-fetch';

export default {
    data() {
        return {
            news: [],
        };
    },
    created() {
        this.fetchNews();
    },
    methods: {
        fetchNews() {
            fetch('/data.json')
                .then(response => response.json())
                .then((data) => {
                    for (const n of data.newsfiles) {
                        fetch(`/news/${n.filename}.md`)
                            .then(response => response.text())
                            .then((text) => {
                                console.log(text);
                                this.news.push({
                                    title: n.title,
                                    date: n.date,
                                    content: markdown.toHTML(text),
                                });
                            });
                    }
                }
            );
        },
    },
};

</script>
