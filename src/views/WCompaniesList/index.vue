<template>
  <div class='w-warehouses-list-page'>
    <w-navigation></w-navigation>
    <h1>List of Companies</h1>
    <b-button to="/companies/add">add company</b-button>
    <w-list></w-list>
  </div>
</template>

<script>
    import WNavigation from '../../components/WNavigation';
    import WList from './components/WList';
    import { BButton } from 'bootstrap-vue';

    export default {
        name: 'WWarehousesListPage',
        components: {
            WNavigation,
            WList,
            BButton
        }
    };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
