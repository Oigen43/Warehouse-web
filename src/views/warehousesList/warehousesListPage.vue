<template>
    <b-container class="warehousesListPage">
      <b-row>
        <b-col><h1>List of Warehouses</h1></b-col>
      </b-row>
      <b-row>
        <b-col><list/></b-col>
      </b-row>
    </b-container>
</template>

<script>

import list from './components/list/list';

export default {
  name: 'warehousesListPage',
  components: {
    list
  }
};
</script>

<style lang="scss">

@import './warehousesListPage.scss';

</style>
