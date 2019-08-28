<template>
    <b-container class='warehousesListPage'>
      <b-row>
        <b-col><h1>List of Warehouses</h1></b-col>
      </b-row>
      <b-row>
        <b-col><wh-list/></b-col>
      </b-row>
    </b-container>
</template>

<script>
  import list from './components/list';

  export default {
    name: 'warehousesListPage',
    components: {
      'wh-list': list
    }
  };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
