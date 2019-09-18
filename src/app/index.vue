<template>
  <div class="app">
    <w-navigation></w-navigation>
    <b-container fluid class="main-container">
      <router-view/>
      <w-toast-notification></w-toast-notification>
    </b-container>
  </div>
</template>

<script>
    import { BContainer } from 'bootstrap-vue';

    import WNavigation from '../components/WNavigation';
    import WToastNotification from '../components/WToastNotification';

    export default {
        name: 'app',
        components: {
            BContainer,
            WNavigation,
            WToastNotification
        },
    };

</script>

<style lang='scss' scoped>
  @import './styles.scss';
</style>
