<template>
  <div class='w-warehouses-list'>
    <b-list-group>
      <b-list-group-item>IKEA</b-list-group-item>
      <b-list-group-item>NIKE</b-list-group-item>
      <b-list-group-item>AMAZON.COM</b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
  import { BListGroup, BListGroupItem } from 'bootstrap-vue';

  export default {
    name: 'WList',
    components: {
      BListGroup,
      BListGroupItem
    }
  };
</script>

<style lang='scss' scoped>
  @import './styles.scss';
</style>
