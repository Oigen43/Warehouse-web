<template>
  <w-table
    :items="transport"
    :fields="fields">
    <template
      v-slot:cell(buttons)="data">
      <b-button
        class="w-table-update-button"
        variant="dark"
        size="sm"
        @click="clickedUpdateButton(data.item)">
        Update
      </b-button>
      <b-button
        variant="light"
        size="sm"
        @click="clickedDeleteButton(data.item)">
        ✕
      </b-button>
    </template>
  </w-table>
</template>

<script>
    import { mapActions } from 'vuex';
    import { BButton } from 'bootstrap-vue';

    import WTable from '../../../../components/WTable';
    import router from '../../../../router';
    import * as modal from '../../../../constants/modal';

    export default {
        name: 'WList',
        components: {
            WTable,
            BButton
        },
        props: ['transport'],
        data: function () {
            return {
                fields: [
                    'carrierName', 'transportType', 'transportNumber',
                    {
                        key: 'date',
                        label: 'Date',
                        formatter: value => {
                            return value.slice(0, 10);
                        }
                    },
                    { key: 'buttons', label: '', class: 'w-list-button' },
                    { key: 'blank', label: '', class: 'w-blank-column' }
                ]
            };
        },
        methods: {
            ...mapActions({
                getUpdatedTransportData: 'getUpdatedTransport',
                sendDeletedTransportData: 'deleteTransport'
            }),
            clickedUpdateButton(item) {
                this.getUpdatedTransportData(item);
                router.push('/transport/update');
            },
            clickedDeleteButton(item) {
                this.$bvModal.msgBoxConfirm(modal.TRANSPORT_TEXT, {
                    title: `${modal.TRANSPORT_TITLE} ${item.transportType} ${item.transportNumber}`,
                    ...modal.CONFIRM_MODAL_OPTIONS
                })
                    .then(value => value && this.deleteTransport(item));
            },
            deleteTransport(item) {
                this.$emit('delete-button-clicked', item);
            }
        }
    };
</script>
