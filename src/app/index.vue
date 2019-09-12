<template>
  <div class='app'>
    <router-view />
  </div>
</template>

<script>
  import Vue from 'vue';
  import { ToastPlugin } from 'bootstrap-vue';

  import { mapState } from 'vuex';

  Vue.use(ToastPlugin);

  export default {
    name: 'app',
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

<style lang='scss' scoped>
  @import './styles.scss';
</style>
