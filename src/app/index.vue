<template>
  <div class='app'>
    <wh-navigation></wh-navigation>
    <router-view />
  </div>
</template>

<script>
  import navigation from '../components/navigation';

  export default {
    name: 'app',
    components: {
      'wh-navigation': navigation
    }
  };
</script>

<style lang='scss' scoped>
  @import './styles.scss';
</style>
