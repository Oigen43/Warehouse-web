<template>
  <div class="app">
    <navigation></navigation>
    <router-view/>
  </div>
</template>

<script>

import navigation from './components/navigation/navigation';

export default {
  name: 'app',
  components: {
    navigation
  }
};

</script>
