<template>
  <div class='warehouses-list'>
    <b-list-group>
      <b-list-group-item>IKEA</b-list-group-item>
      <b-list-group-item>NIKE</b-list-group-item>
      <b-list-group-item>AMAZON.COM</b-list-group-item>
    </b-list-group>
    <div>
      <b-form-input placeholder="search" type="text" v-model="keyword"></b-form-input>
      <b-table head-variant="light" hover :items="filterItems" :fields="fields" :keyword="keyword"></b-table>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'warehousesList',
    data () {
      return {
        fields: [
          {
            key: 'company_name',
            sortable: true
          },
          {
            key: 'address',
            sortable: true
          },
          {
            key: 'description',
            sortable: false
          },
          {
            key: 'date',
            sortable: true
          }
        ],
        items: [
          {
            company_name: 'IKEA',
            address: 'USA',
            description: 'Swedish-founded multinational group that designs and sells ready-to-assemble furniture',
            date: new Date(1943, 6, 28)
          },
          {
            company_name: 'NIKE',
            address: 'Washington County, Oregon, U.S. (Near Beaverton, Oregon)',
            description: ' American multinational corporation that is engaged in ' +
              'the design, development, manufacturing, and worldwide marketing ' +
              'and sales of footwear, apparel, equipment, accessories, and services.',
            date: new Date(1964, 0, 25)
          },
          {
            company_name: 'AMAZON.COM',
            address: 'Seattle, Washington, and Arlington, Virginia, United States',
            description: 'American multinational technology company based in Seattle, Washington',
            date: new Date(1994, 6, 5)
          }
        ],
        keyword: ''
      };
    },
    computed: {
      filterItems() {
        return this.keyword ? this.items.filter(item =>
          item.company_name.includes(this.keyword) ||
          item.address.includes(this.keyword)) : this.items;
      }
    }
  };
</script>

<style lang='scss' scoped>
  @import './styles.scss';
</style>
