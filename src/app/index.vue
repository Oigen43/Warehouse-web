<template>
  <div class="app">
    <w-navigation></w-navigation>
    <b-container fluid class="main-container">
      <router-view/>
    </b-container>
  </div>
</template>

<script>
    import { BContainer } from 'bootstrap-vue';

    import WNavigation from '../components/WNavigation';

    export default {
        name: 'app',
        components: {
            BContainer,
            WNavigation
        },
    };
</script>

<style lang='scss' scoped>
  @import './styles.scss';
</style>
