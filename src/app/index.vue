<template>
  <div class='app'>
    <w-navigation></w-navigation>
    <router-view />
  </div>
</template>

<script>
  import WNavigation from '../components/WNavigation';

  export default {
    name: 'app',
    components: {
      WNavigation
    }
  };
</script>

<style lang='scss' scoped>
  @import './styles.scss';
</style>
