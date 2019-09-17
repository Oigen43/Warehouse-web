<template>
  <div class='app'>
    <router-view />
    <w-toast-notification></w-toast-notification>
  </div>
</template>

<script>
  import WToastNotification from '../components/WToastNotification';

  export default {
    name: 'app',
    components: {
        WToastNotification
    }
  };
</script>

<style lang='scss' scoped>
  @import './styles.scss';
</style>
