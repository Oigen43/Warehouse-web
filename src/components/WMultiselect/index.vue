<template>
    <multiselect
        v-model="mutableValue"
        :tag-placeholder="tagPlaceholder"
        :placeholder="placeholder"
        :options="options"
        :multiple="true"
        :taggable="true"
        :searchable="false"
        @tag="addTag"
        @input="updateValue"
    ></multiselect>
</template>

<script>
    import Multiselect from 'vue-multiselect';
    export default {
        name: 'WMultiselect',
        components: {
            Multiselect
        },
        props: {
            options: {
                type: Array
            },
            value: {
                type: Array
            },
            tagPlaceholder: {
                type: String
            },
            placeholder: {
                type: String
            }
        },
        data: function() {
            return {
                mutableValue: this.value
            };
        },
        methods: {
            addTag (newTag) {
                const tag = {
                    name: newTag,
                    code: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
                };
                this.options.push(tag);
                this.value.push(tag);
            },
            updateValue() {
                this.$emit('value-updated', this.mutableValue);
            }
        }
    };
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
