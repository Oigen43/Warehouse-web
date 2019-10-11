<template>
  <div class="app">
    <w-navigation></w-navigation>
    <b-container fluid class="main-container">
      <router-view/>
      <w-toast-notification></w-toast-notification>
      <w-spinner></w-spinner>
    </b-container>
    <w-footer></w-footer>
  </div>
</template>

<script>
    import Vue from 'vue';
    import { BContainer, ModalPlugin } from 'bootstrap-vue';

    import WNavigation from '../components/WNavigation';
    import WToastNotification from '../components/WToastNotification';
    import WFooter from '../components/WFooter';
    import WSpinner from "../components/WSpinner";

    Vue.use(ModalPlugin);

    export default {
        name: 'app',
        components: {
            WSpinner,
            BContainer,
            WNavigation,
            WToastNotification,
            WFooter
        },
    };

</script>

<style lang='scss' scoped>
  @import './styles.scss';
</style>
