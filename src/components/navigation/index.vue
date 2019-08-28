<template>
  <b-nav class='navigation'>
    <b-nav-item>
      <router-link to='/'>Home</router-link>
    </b-nav-item>
    <b-nav-item>
      <router-link to='/warehouses-list'>List</router-link>
    </b-nav-item>
  </b-nav>
</template>

<script>
  export default {
    name: 'navigation'
  };
</script>

<style lang='scss' scoped>
  @import './styles.scss';
</style>
