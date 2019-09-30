<template>
  <div class="w-table">
  <b-table
    head-variant="dark"
    class="w-list-table"
    borderless
    stacked="lg"
    v-bind="$attrs">
    <template v-for="slot in Object.keys($scopedSlots)" :slot="slot" slot-scope="scope"><slot :name="slot" v-bind="scope"/></template>
  </b-table>
  </div>
</template>

<script>
    import { BTable } from 'bootstrap-vue';

    export default {
        name: 'WTable',
        components: {
            BTable
        }
    };
</script>

<style lang="scss">
  @import './styles.scss';
</style>
