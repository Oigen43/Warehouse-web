<template>
  <b-spinner
    v-if="loading"
    style="width: 4rem; height: 4rem;"
    label="Large Spinner"
  ></b-spinner>
  <div v-else>
    <div v-if="isItemsExists" class="w-table">
      <b-table
        head-variant="dark"
        class="w-list-table"
        borderless
        stacked="lg"
        v-bind="$attrs">
        <template
          v-for="slot in Object.keys($scopedSlots)"
          :slot="slot"
          slot-scope="scope">
          <slot
            :name="slot"
            v-bind="scope"/>
        </template>
      </b-table>
    </div>
    <w-empty-table v-else></w-empty-table>
  </div>
</template>

<script>
    import { mapState } from 'vuex';
    import { BTable, BSpinner } from 'bootstrap-vue';

    import WEmptyTable from '../../components/WEmptyTable';
    import helpers from '../../utils/helpers';

    export default {
        name: 'WTable',
        components: {
            BTable,
            BSpinner,
            WEmptyTable
        },
        computed: {
            ...mapState([
                'loading'
            ]),
            isItemsExists() {
                return helpers.isItemsExists(this.$attrs.items);
            }
        },
    };
</script>

<style lang="scss">
  @import './styles.scss';
</style>
