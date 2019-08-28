<template>
  <div class='homePage'>
    <wh-greetingSection msg='Welcome on Warehouse Online'/>
  </div>
</template>

<script>
  import greetingSection from './components/greetingSection';

  export default {
    name: 'homePage',
    components: {
      'wh-greetingSection': greetingSection
    }
  };
</script>

<style lang='scss' scoped>
  @import './styles.scss';
</style>
