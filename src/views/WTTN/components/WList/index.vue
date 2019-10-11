<template>
  <w-table
    :items="items"
    :fields="fields">
    <template
      v-slot:cell(buttons)="data">
      <b-button
        v-if="data.item.status === 'registered' &&
              hasPermissions(routesPermissions.ttn.update)"
        class="w-table-update-button"
        variant="dark"
        size="sm"
        @click="clickedUpdateButton(data.item)">
        Update
      </b-button>
      <b-button
        v-if="data.item.status === 'registered' &&
              hasPermissions(routesPermissions.ttn.delete)"
        variant="light"
        size="sm"
        @click="clickedDeleteButton(data.item)">
        ✕
      </b-button>
    </template>
    <template
      v-slot:cell(options)="data">
      <b-button
        v-if="(data.item.status === 'registered' ||
              data.item.status === 'release allowed') &&
              hasPermissions(routesPermissions.ttn.check)"
        class="w-table-check-button"
        variant="dark"
        size="sm"
      >
        Check
      </b-button>
      <b-button
        v-if="data.item.status === 'confirmed' &&
              hasPermissions(routesPermissions.ttn.takeOut)"
        class="w-table-take-out-button"
        variant="dark"
        size="sm"
        @click="clickedTakeOutButton(data.item)">
        Take out
      </b-button>
    </template>
  </w-table>
</template>

<script>
    import { mapActions } from 'vuex';
    import { BButton } from 'bootstrap-vue';

    import { validation } from '../../../../components/mixins/validation';
    import routesPermissions from '../../../../constants/routesPermissions';
    import WTable from '../../../../components/WTable';
    import router from '../../../../router';
    import * as modal from '../../../../constants/modal';

    export default {
        name: 'WList',
        mixins: [validation],
        components: {
            BButton,
            WTable
        },
        props: ['ttn'],
        computed: {
            fields: function () {
                const fieldsList = [
                    'number', 'registrationDate', 'type', 'status', 'carrier', 'sender_receiver'
                ];

                this.ttn.some(item => {
                    return item.status === 'confirmed' ||
                        item.status === 'release allowed';
                }) && fieldsList.push({ key: 'options', label: '', class: 'w-options-button' });

                this.ttn.some(item => {
                    return (item.status === 'registered') &&
                        this.hasPermissions(this.routesPermissions.ttn.update) &&
                        this.hasPermissions(this.routesPermissions.ttn.delete);
                }) && fieldsList.push({ key: 'buttons', label: '', class: 'w-list-button' });

                return fieldsList;
            },

            items: function() {
                this.ttn.forEach(item => {
                    item.registrationDate = item.registrationDate.slice(0, 10);
                });

                return this.ttn;
            },

            routesPermissions: function () {
                return routesPermissions;
            }
        },
        methods: {
            ...mapActions({
                getUpdatedTtnData: 'getUpdatedTtn'
            }),
            clickedUpdateButton(item) {
                this.getUpdatedTtnData(item);
                router.push('/ttn/update');
            },
            clickedDeleteButton(item) {
                this.$bvModal.msgBoxConfirm(modal.TTN_DELETE_TEXT, {
                    title: `${modal.TTN_DELETE_TITLE} ${item.number} ${item.registrationDate}`,
                    ...modal.CONFIRM_MODAL_OPTIONS
                })
                    .then(value => value && this.deleteTtn(item));
            },
            deleteTtn(item) {
                this.$emit('delete-button-clicked', item);
            },
            clickedTakeOutButton(item) {
                this.$bvModal.msgBoxConfirm(modal.TTN_TAKE_OUT_TEXT, {
                    title: `${modal.TTN_TAKE_OUT_TITLE} ${item.number} ${item.registrationDate}`,
                    ...modal.CONFIRM_MODAL_OPTIONS
                })
                    .then(value => value && this.takeOutTtn(item));
            },
            takeOutTtn(item) {
                this.$emit('take-out-button-clicked', item);
            }
        }
    };
</script>
