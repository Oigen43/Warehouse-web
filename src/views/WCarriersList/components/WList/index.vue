<template>
  <w-table
    :insert="true"
    :items="carriers"
    :fields="fields">
    <template
      v-slot:cell(active)="data">
      <b-form-checkbox
        v-model="data.value"
        disabled>
      </b-form-checkbox>
    </template>
    <template
      v-slot:cell(drivers)="data">
      <b-button
        variant="light"
        size="sm"
        @click="clickedDriversButton(data.item)">
        Drivers
      </b-button
      >
    </template>
    <template
      v-slot:cell(transport)="data">
      <b-button
        variant="light"
        size="sm"
        @click="clickedTransportButton(data.item)">
        Transport
      </b-button
      >
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
        props: ['carriers'],
        data: function () {
            return {
                fields: [
                    'name', 'upn', 'countryCode',
                    {
                        key: 'date',
                        label: 'Date',
                        formatter: value => {
                            return value.slice(0, 10);
                        }
                    },
                    { key: 'drivers', label: '', class: 'w-list-button' },
                    { key: 'transport', label: '', class: 'w-list-button' },
                    { key: 'buttons', label: '', class: 'w-list-button' },
                    { key: 'blank', label: '', class: 'w-blank-column' }
                ]
            };
        },
        methods: {
            ...mapActions({
                sendUpdatedCarrier: 'sendUpdatedCarrier'
            }),
            clickedDriversButton(item) {
                router.push(`/carriers/${item.id}/drivers`);
            },
            clickedTransportButton(item) {
                router.push(`/carriers/${item.id}/transport`);
            },
            clickedUpdateButton(item) {
                router.push(`/carriers/${item.id}/update`);
            },
            clickedDeleteButton(item) {
                this.$bvModal.msgBoxConfirm(modal.CARRIER_TEXT, {
                    title: `${modal.CARRIER_TITLE} ${item.name}`,
                    ...modal.CONFIRM_MODAL_OPTIONS
                })
                    .then(value => value && this.deleteCarrier(item));
            },
            deleteCarrier(item) {
                this.$emit('delete-button-clicked', item);
            }
        }
    };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
