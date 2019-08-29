<template>
  <div class='w-home-page'>
    <w-navigation></w-navigation>
    <w-greeting-section msg='Welcome on Warehouse Online'/>
  </div>
</template>

<script>
  import WGreetingSection from './components/WGreetingSection';
  import WNavigation from '../../components/WNavigation';

  export default {
    name: 'WHomePage',
    components: {
      WGreetingSection,
      WNavigation
    }
  };
</script>

<style lang='scss' scoped>
  @import './styles.scss';
</style>
