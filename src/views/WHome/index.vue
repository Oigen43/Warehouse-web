<template>
  <div class="w-home-page">
    <w-navigation></w-navigation>
    <w-content></w-content>
  </div>
</template>

<script>

    import WNavigation from '../../components/WNavigation';
    import WContent from './components/WContent';

    export default {
        name: 'WHomePage',
        components: {
            WNavigation,
            WContent
        }
    };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
