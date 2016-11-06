<template>
    <div>
    <template v-for="help in helps">
    {{ help.title }}
    <div v-html="help.content">
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
            helps: [],
        };
    },
    created() {
        this.fetchHelps();
    },
    methods: {
        fetchHelps() {
            fetch('/data.json')
                .then(response => response.json())
                .then((data) => {
                    for (const filename of data.helpfiles) {
                        fetch(`/helps/${filename}.md`)
                            .then(response => response.text())
                            .then((text) => {
                                console.log(text);
                                this.helps.push({
                                    title: filename,
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
