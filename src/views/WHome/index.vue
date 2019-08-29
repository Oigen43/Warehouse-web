<template>
  <div class='w-home-page'>
    <w-greeting-section msg='Welcome on Warehouse Online'/>
  </div>
</template>

<script>
  import WGreetingSection from './components/WGreetingSection';

  export default {
    name: 'WHomePage',
    components: {
      WGreetingSection
    }
  };
</script>

<style lang='scss' scoped>
  @import './styles.scss';
</style>
