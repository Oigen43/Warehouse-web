<template>
  <div class='w-warehouses-list'>
    <b-button to="/companies/add">add company</b-button>
    <div>
      <b-table head-variant="light" borderless hover :items="companies" :fields="fields"></b-table>
    </div>
  </div>
</template>

<script>
    import { mapActions, mapState } from 'vuex';
    import { BTable, BButton } from 'bootstrap-vue';

    export default {
        name: 'WList',
        components: {
            BTable,
            BButton
        },
        created: function () {
            this.fetchWarehousesList();
        },
        methods: {
            ...mapActions({
                fetchWarehousesList: 'commitWarehousesList'
            })
        },
        computed: {
            ...mapState([
                'companies'
            ])
        },
        data: function () {
            return {
                fields: ['company_name', 'address', 'description', 'date']
            };
        }
    };
</script>

<style lang='scss' scoped>
  @import './styles.scss';
</style>
