<template>
  <div class="app">
    <w-navigation></w-navigation>
    <b-container fluid class="main-container">
      <router-view/>
      <w-modal></w-modal>
      <w-toast-notification></w-toast-notification>
    </b-container>
    <w-footer></w-footer>
  </div>
</template>

<script>
    import { BContainer } from 'bootstrap-vue';

    import WNavigation from '../components/WNavigation';
    import WModal from '../components/WModal';
    import WToastNotification from '../components/WToastNotification';
    import WFooter from '../components/WFooter';

    export default {
        name: 'app',
        components: {
            BContainer,
            WNavigation,
            WModal,
            WToastNotification,
            WFooter
        },
    };

</script>

<style lang='scss' scoped>
  @import './styles.scss';
</style>
