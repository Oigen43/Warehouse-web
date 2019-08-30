<template>
  <div class='w-warehouses-list'>
    <div>
      <b-table head-variant="light" borderless hover :items="companies" :fields="fields"></b-table>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import { BTable } from 'bootstrap-vue';

  export default {
    name: 'WList',
    components: {
      BTable
    },
    created: function() {
      this.fetchWarehousesList();
    },
    methods: {
      ...mapActions({
        fetchWarehousesList: 'commitWarehousesList'
      })
    },
    computed: {
      ...mapGetters({
      companies: 'getCompaniesList'
    })
    },
    data: function() {
      return {
        list: [],
        fields: ['company_name', 'address', 'description', 'date']
      };
    }
  };
</script>

<style lang='scss' scoped>
  @import './styles.scss';
</style>
