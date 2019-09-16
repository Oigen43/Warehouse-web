<template>
  <div></div>
</template>

<script>
    import Vue from 'vue';
    import { ToastPlugin } from 'bootstrap-vue';

    import { mapState } from 'vuex';

    Vue.use(ToastPlugin);

    export default {
        name: 'WToastNotification',
        computed: {
            ...mapState([
                'popup'
            ])
        },
        watch: {
            popup(newVal, oldVal) {
                this.makeToast(this.popup.variant);
            }
        },
        methods: {
            makeToast(variant = null) {
                this.$bvToast.toast(this.popup.message, {
                    title: `Variant ${variant || 'default'}`,
                    variant: variant,
                    solid: true
                });
            }
        }
    };
</script>

<style scoped>

</style>
