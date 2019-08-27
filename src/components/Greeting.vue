<template>
  <div class="greeting">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'Greeting',
  props: {
    msg: String
  }
};
</script>

<style scoped lang="scss">

</style>
