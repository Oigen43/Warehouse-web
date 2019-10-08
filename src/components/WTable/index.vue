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
  <div v-else>
    <h1>There is no elements yet!</h1>
    <h3>Insert elements here!</h3>
  </div>
</template>

<script>
    import { BTable } from 'bootstrap-vue';

    export default {
        name: 'WTable',
        components: {
            BTable
        },
        computed: {
            isItemsExists() {
                return this.$attrs.items.length;
            }
        },
    };
</script>

<style lang="scss">
  @import './styles.scss';
</style>
