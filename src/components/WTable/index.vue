<template>
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
    <w-empty-table :insert="insert" v-else></w-empty-table>
</template>

<script>
    import { BTable } from 'bootstrap-vue';

    import helpers from '../../utils/helpers';
    import WEmptyTable from '../WEmptyTable';

    export default {
        name: 'WTable',
        components: {
            BTable,
            WEmptyTable
        },
        props: ['insert'],
        computed: {
            isItemsExists() {
                return helpers.isItemsExists(this.$attrs.items);
            }
        },
    };
</script>

<style lang="scss">
  @import './styles.scss';
</style>
