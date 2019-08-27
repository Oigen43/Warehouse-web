<template>
  <div class="home">
    <Greeting msg="Welcome on Warehouse Online"/>
  </div>
</template>

<script>

import Greeting from '@/components/Greeting.vue';

export default {
  name: 'home',
  components: {
    Greeting
  }
};
</script>
