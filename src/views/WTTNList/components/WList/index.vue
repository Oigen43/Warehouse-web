<template>
  <w-table
    :items="items"
    :fields="fields">
    <template
      v-slot:cell(buttons)="data">
      <b-button
        v-if="hasUpdateAction(data.item)"
        class="w-table-update-button"
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
        class="w-table-check-button"
        variant="dark"
        size="sm"
        @click="clickedCheckButton(data.item)">
        Check
      </b-button>
      <b-button
        v-if="hasStorageAction(data.item)"
        variant="dark"
        size="sm"
        @click="clickedStorageButton(data.item)">
        Storage
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
                    { key: 'Sender.senderName', label: 'Sender' },
                    { key: 'buttons', label: '', class: 'w-list-button' },
                    { key: 'blank', label: '', class: 'w-blank-column' }
                ]
            };
        },
        computed: {
            items: function () {
                this.TTN.forEach(item => {
                    item.registrationDate = `${item.registrationDate.slice(0, 10)} ${item.registrationDate.slice(11, 19)}`;
                });

                return this.TTN;
            },
            routesPermissions: function () {
                return routesPermissions;
            },
        },
        methods: {
            hasUpdateAction(item) {
                return item.status === statuses.REGISTERED_STATUS &&
                    this.hasPermissions(this.routesPermissions.TTN.update);
            },
            hasDeleteAction(item) {
                return item.status === statuses.REGISTERED_STATUS &&
                    this.hasPermissions(this.routesPermissions.TTN.delete);
            },
            hasCheckAction(item) {
                return (item.status === statuses.REGISTERED_STATUS ||
                    item.status === statuses.RELEASE_ALLOWED_STATUS) &&
                    this.hasPermissions(this.routesPermissions.TTN.check);
            },
            hasStorageAction(item) {
                return (item.status === statuses.CONFIRMED_STATUS ||
                    item.status === statuses.RELEASE_ALLOWED_STATUS) &&
                    this.hasPermissions(this.routesPermissions.TTN.storage);
            },
            clickedUpdateButton(item) {
                router.push(`/ttn/${item.id}/update`);
            },
            clickedDeleteButton(item) {
                this.$bvModal.msgBoxConfirm(modal.TTN_DELETE_TEXT, {
                    title: `${modal.TTN_DELETE_TITLE} ${item.number} ${item.registrationDate}`,
                    ...modal.CONFIRM_MODAL_OPTIONS
                })
                    .then(value => value && this.deleteTTN(item));
            },
            deleteTTN(item) {
                this.$emit('delete-button-clicked', item);
            },
            clickedStorageButton(item) {
                router.push(`/ttn/${item.id}/storage-goods`);
            },
            clickedCheckButton(item) {
                router.push(`/ttn/${item.id}/check`);
            }
        }
    };
</script>
