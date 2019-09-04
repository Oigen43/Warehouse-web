<template>
  <b-table
    head-variant="light"
    borderless
    hover
    :items="companiesList"
    :fields="fields"
  ></b-table>
</template>

<script>
  import { BTable } from 'bootstrap-vue';

  export default {
    name: 'WList',
    components: {
      BTable,
    },
    props: ['companiesList'],
    data: function() {
      return {
        fields: ['company_name', 'address', 'description', 'date']
      };
    }
  };
</script>
