<template>
  <div class='w-companies-list-page'>
    <w-navigation></w-navigation>
    <h1>List of Companies</h1>
    <b-button to="/companies/add" class="w-companies-add-button">add company</b-button>
    <w-list></w-list>
  </div>
</template>

<script>
    import WNavigation from '../../components/WNavigation';
    import WList from './components/WList';
    import { BButton } from 'bootstrap-vue';

    export default {
        name: 'WCompaniesListPage',
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
