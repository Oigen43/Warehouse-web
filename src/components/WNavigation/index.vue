<template>
  <b-nav class='w-navigation'>
    <b-nav-item>
      <router-link to='/'>Home</router-link>
    </b-nav-item>
    <b-nav-item>
      <router-link to='/warehouses-list'>List</router-link>
    </b-nav-item>
  </b-nav>
</template>

<script>
  import { BNav, BNavItem } from 'bootstrap-vue';

  export default {
    name: 'WNavigation',
    components: {
      BNav,
      BNavItem
    }
  };
</script>

<style lang='scss' scoped>
  @import './styles.scss';
</style>
