<template>
  <div class="w-companies-add-form">
    <w-navigation></w-navigation>
    <h1>Company Add Form</h1>
    <w-form></w-form>
  </div>
</template>

<script>
    import WNavigation from '../../components/WNavigation';
    import WForm from './components/WForm';

    export default {
        name: 'WCompaniesAddForm',
        components: {
            WNavigation,
            WForm
        }
    };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
