<template>
  <w-table
    :items="storagesList"
    :fields="fields">
  </w-table>
</template>

<script>
    import WTable from '../../../../components/WTable';

    export default {
        name: 'WList',
        components: {
            WTable
        },
        props: ['storagesList'],
        data: function () {
            return {
                fields: [
                    'storageType', 'storageCapacity'
                ]
            };
        }
    };
</script>
