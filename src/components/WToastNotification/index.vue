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
                'toast'
            ])
        },
        watch: {
            toast(newVal, oldVal) {
                this.makeToast(this.toast);
            }
        },
        methods: {
            makeToast(toast) {
                this.$bvToast.toast(this.toast.message, {
                    title: toast.title,
                    variant: toast.variant,
                    solid: true
                });
            }
        }
    };
</script>
