<template>
    <multiselect
        v-bind="$attrs"
        v-on="$listeners"
        :multiple="true"
        :taggable="true"
        :searchable="false"
        :close-on-select="false"
        @tag="addTag"
    ></multiselect>
</template>

<script>
    import Multiselect from 'vue-multiselect';
    export default {
        name: 'WMultiselect',
        components: {
            Multiselect
        },
        methods: {
            addTag (newTag) {
                const tag = {
                    name: newTag,
                    code: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
                };
                this.options.push(tag);
                this.value.push(tag);
            }
        }
    };
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
