<template>
  <w-table
    :insert="hasPermissions(this.routesPermissions.TTN.create)"
    :items="items"
    :fields="fields">
    <template
      v-slot:cell(buttons)="data">
      <b-button
        v-if="hasUpdateAction(data.item)"
        class="w-ttn-button"
        variant="dark"
        size="sm"
        @click="clickedUpdateButton(data.item)">
        Update
      </b-button>
      <b-button
        v-if="hasDeleteAction(data.item)"
        variant="light"
        size="sm"
        @click="clickedDeleteButton(data.item)">
        ✕
      </b-button>
      <b-button
        v-if="hasCheckAction(data.item)"
        class="w-ttn-button"
        variant="dark"
        size="sm"
        @click="clickedCheckButton(data.item)">
        Check
      </b-button>
      <b-button
        v-if="hasOutAction(data.item)"
        class="w-ttn-button"
        variant="dark"
        size="sm"
        @click="clickedOutButton(data.item)">
        Out
      </b-button>
      <b-button
        v-if="hasStorageAction(data.item)"
        class="w-ttn-button"
        variant="dark"
        size="sm"
        @click="clickedStorageButton(data.item)">
        Storage
      </b-button>
      <b-button
        v-if="hasOpenAction(data.item)"
        class="w-ttn-button"
        variant="dark"
        size="sm"
        @click="clickedOpenButton(data.item)">
        Open
      </b-button>
    </template>
  </w-table>
</template>

<script>
    import { BButton } from 'bootstrap-vue';

    import router from '../../../../router';
    import { validation } from '../../../../components/mixins/validation';
    import routesPermissions from '../../../../constants/routesPermissions';
    import WTable from '../../../../components/WTable';
    import * as modal from '../../../../constants/modal';
    import * as statuses from '../../../../constants/statuses';

    export default {
        name: 'WList',
        mixins: [validation],
        components: {
            BButton,
            WTable
        },
        props: ['TTN'],
        data() {
            return {
                fields: [
                    'number', 'registrationDate', 'type', 'status',
                    { key: 'Carrier.name', label: 'Carrier' },
                    { key: 'Sender', label: 'Sender' },
                    { key: 'Receiver', label: 'Receiver' },
                    { key: 'buttons', label: '' },
                ]
            };
        },
        computed: {
            items: function () {
                this.TTN.forEach(item => {
                    item.registrationDate = `${item.registrationDate.slice(0, 10)} ${item.registrationDate.slice(11, 19)}`;
                    item.Sender = item.Sender ? item.Sender.senderName : 'N/A';
                    item.Receiver = item.Receiver ? item.Receiver.receiverName : 'N/A';
                });
                return this.TTN;
            },
            routesPermissions: function () {
              return routesPermissions;
            }
        },
        methods: {
            hasUpdateAction(item) {
                return (item.status === statuses.REGISTERED_STATUS || item.status === statuses.RELEASE_ALLOWED_STATUS) &&
                    this.hasPermissions(this.routesPermissions.TTN.update);
            },
            hasDeleteAction(item) {
                return (item.status === statuses.REGISTERED_STATUS || item.status === statuses.RELEASE_ALLOWED_STATUS) &&
                    this.hasPermissions(this.routesPermissions.TTN.delete);
            },
            hasCheckAction(item) {
                return (item.status === statuses.REGISTERED_STATUS ||
                item.status === statuses.TAKEN_OUT_OF_STORAGE_STATUS) &&
                this.hasPermissions(this.routesPermissions.TTN.check);
            },
            hasOutAction(item) {
                return (item.status === statuses.IN_STORAGE_STATUS &&
                this.hasPermissions(this.routesPermissions.TTN.out));
            },
            hasStorageAction(item) {
                return (item.status === statuses.CONFIRMED_STATUS || statuses.RELEASE_ALLOWED_STATUS) &&
                    this.hasPermissions(this.routesPermissions.TTN.storage);
            },
            hasOpenAction(item) {
                return (item.status === statuses.ARCHIVED_STATUS || statuses.VERIFICATION_COMPLETED_STATUS) &&
                    this.hasPermissions(this.routesPermissions.TTN.getById);
            },
            clickedUpdateButton(item) {
                router.push(`/gcn/${item.id}/update`);
            },
            clickedDeleteButton(item) {
                this.$bvModal.msgBoxConfirm(modal.TTN_DELETE_TEXT, {
                    title: `${modal.TTN_DELETE_TITLE} ${item.number} ${item.registrationDate}`,
                    ...modal.CONFIRM_MODAL_OPTIONS
                })
                    .then(value => value && this.deleteTTN(item));
            },
            clickedOutButton(item) {
                router.push(`/gcn/${item.id}/addOut`);
            },
            deleteTTN(item) {
                this.$emit('delete-button-clicked', item);
            },
            clickedStorageButton(item) {
                router.push(`/gcn/${item.id}/storage-goods`);
            },
            clickedCheckButton(item) {
                router.push(`/gcn/${item.id}/check`);
            },
            clickedOpenButton(item) {
                router.push(`/gcn/${item.id}`);
            }
        }
    };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
