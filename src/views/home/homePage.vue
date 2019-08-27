<template>
  <div class="homePage">
    <greetingSection msg="Welcome on Warehouse Online"/>
  </div>
</template>

<script>
import greetingSection from './components/greetingSection/greetingSection';

export default {
  name: 'homePage',
  components: {
    greetingSection
  }
};
</script>
