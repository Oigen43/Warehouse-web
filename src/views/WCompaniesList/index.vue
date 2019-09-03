<template>
  <div class='w-warehouses-list-page'>
    <w-navigation></w-navigation>
    <h1>List of Warehouses</h1>
    <w-list></w-list>
  </div>
</template>

<script>
  import WNavigation from '../../components/WNavigation';
  import WList from './components/WList';
  export default {
    name: 'WWarehousesListPage',
    components: {
      WNavigation,
      WList
    }
  };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
