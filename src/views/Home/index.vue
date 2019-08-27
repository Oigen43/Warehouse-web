<template>
  <div class="home">
    <greetingSection msg="Welcome on Warehouse Online"/>
  </div>
</template>

<script>
import greetingSection from './components/greetingSection';

export default {
  name: 'home',
  components: {
    greetingSection
  }
};
</script>
