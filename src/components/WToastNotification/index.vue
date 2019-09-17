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
                this.makeToast(this.toast.variant);
            }
        },
        methods: {
            makeToast(variant = null) {
                this.$bvToast.toast(this.toast.message, {
                    title: variant === 'success' ? 'Success!'
                        : variant === 'danger' ? 'Error!' : 'Info',
                    variant: variant,
                    solid: true
                });
            }
        }
    };
</script>
