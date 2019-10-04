<template>
  <w-table
    :items="senders"
    :fields="fields">
    <template
      v-slot:cell(active)="data">
      <b-form-checkbox
        v-model="data.value"
        disabled>
      </b-form-checkbox>
    </template>
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
    import { BFormCheckbox, BButton } from 'bootstrap-vue';

    import WTable from '../../../../components/WTable';
    import router from '../../../../router';
    import * as modal from '../../../../constants/modal';

    export default {
        name: 'WList',
        components: {
            WTable,
            BFormCheckbox,
            BButton
        },
        props: ['senders'],
        data: function () {
            return {
                fields: [
                    'senderName', 'upn', 'countryCode',
                    {
                        key: 'date',
                        label: 'Date',
                        formatter: value => {
                            return value.slice(0, 10);
                        }
                    },
                    { key: 'buttons', label: '' },
                    { key: 'blank', label: '', class: 'w-blank-column' }
                ]
            };
        },
        methods: {
            ...mapActions({
                getUpdatedSenderData: 'getUpdatedSender',
                sendDeletedSenderData: 'deleteSender'
            }),
            clickedUpdateButton(item) {
                this.getUpdatedSenderData(item);
                router.push('/senders/update');
            },
            clickedDeleteButton(item) {
                this.$bvModal.msgBoxConfirm(modal.SENDER_TEXT, {
                    title: `${modal.SENDER_TITLE} ${item.senderName}`,
                    ...modal.CONFIRM_MODAL_OPTIONS
                })
                    .then(value => value && this.deleteSender(item));
            },
            deleteSender(item) {
                this.$emit('delete-button-clicked', item);
            }
        }
    };
</script>
