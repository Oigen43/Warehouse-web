<template>
  <w-table
    :items="TTN"
    :fields="fields">
    <template
      v-slot:cell(buttons)="data">
      <b-button
        v-if="data.item.status === 'registered'"
        class="w-table-update-button"
        variant="dark"
        size="sm"
        @click="clickedUpdateButton(data.item)">
        Update
      </b-button>
      <b-button
        v-if="data.item.status === 'registered'"
        variant="light"
        size="sm"
        @click="clickedDeleteButton(data.item)">
        ✕
      </b-button>
      <b-button
        v-if="data.item.status === 'confirmed'"
        class="w-table--button"
        variant="dark"
        size="sm"
        >
        Take out
      </b-button>
    </template>
  </w-table>
</template>

<script>
    import { BButton } from 'bootstrap-vue';

    import WTable from '../../../../components/WTable';

    export default {
        name: 'WList',
        components: {
            BButton,
            WTable
        },
        props: ['TTN'],
        // data() {
        //     return {
        //         fields: [
        //             'number', 'registrationDate', 'type', 'status', 'carrier', 'sender_receiver',
        //         ]
        //     };
        // }
        computed: {
            fields: function () {
                const fieldsList = [
                    'number', 'registrationDate', 'type', 'status', 'carrier', 'sender_receiver'
                ];

                this.TTN.some(item => {
                    return item.status === 'registered' || item.status === 'confirmed';
                }) && fieldsList.push({ key: 'buttons', label: '', class: 'w-list-button' });

                return fieldsList;
            }
        }
    };
</script>
