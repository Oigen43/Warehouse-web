<template>
  <b-table
    head-variant="light"
    borderless
    hover
    :items="companiesList"
    :fields="fields">
      <template
        slot="[is_active]"
        slot-scope="data">
          <b-form-checkbox
            v-model="data.value"
            disabled>
          </b-form-checkbox>
      </template>
  </b-table>
</template>

<script>
  import { BTable, BFormCheckbox } from 'bootstrap-vue';

  export default {
    name: 'WList',
    components: {
      BTable,
      BFormCheckbox
    },
    props: ['companiesList'],
    data: function() {
      return {
        fields: ['is_active', 'companyName', 'address', 'description', 'date']
      };
    }
  };
</script>
