<template>
  <div class="w-companies-add-form">
    <w-navigation></w-navigation>
    <h1>Company Add Form</h1>
  </div>
</template>

<script>
    import WNavigation from '../../components/WNavigation';

    export default {
        name: 'WCompaniesAddForm',
        components: {
            WNavigation
        }
    };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
