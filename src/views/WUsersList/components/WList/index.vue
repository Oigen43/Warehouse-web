<template>
  <b-table
   head-variant="dark"
   borderless
   hover
   stacked="sm"
   responsive
   :items="usersList"
   :fields="fields"
  >
    <template
      v-slot:cell(update)="data">
      <b-button
        variant="warning"
        size="sm"
        @click="clickedUpdateButton(data.item)">
        Update
      </b-button>
    </template>
    <template
      slot="[delete]"
      slot-scope="data">
      <b-button
        variant="outline-dark"
        size="sm"
        @click="clickedDeleteModal(data.item)">
        ✕
      </b-button>
    </template>
  </b-table>
</template>

<script>
    import { mapState, mapActions } from 'vuex';
    import { BTable, BButton } from 'bootstrap-vue';

    import router from '../../../../router';

    export default {
        name: 'WList',
        components: {
            BTable,
            BButton
        },
        props: ['usersList'],
        computed: {
            ...mapState([
                'modalValue'
            ])
        },
        watch: {
            modalValue(newVal, oldVal) {
                if (newVal) {
                    this.clickedDeleteButton(this.clickedUser);
                    this.setModalValue(false);
                }
            }
        },
        data() {
            return {
                fields: [
                    'firstName', 'surname', 'patronymic', 'birthDate', 'email', 'address',
                    { key: 'update', label: '' },
                    { key: 'delete', label: '' }
                ],
                modal: {},
                clickedUser: {}
            };
        },
        methods: {
            ...mapActions({
                getUpdatedUserData: 'getUpdatedUser',
                sendDeletedUserData: 'deleteUser',
                createModal: 'createModal',
                setModalValue: 'setModalValue'
            }),
            clickedUpdateButton(item) {
                this.getUpdatedUserData(item);
                router.push('/users/update');
            },
            clickedDeleteModal(item) {
                this.clickedUser = item;
                this.modal = {
                    text: 'Please confirm that you want to delete the user.',
                    title: `Delete user ${item.firstName} ${item.surname}`,
                    size: 'md',
                    buttonSize: 'md',
                    okVariant: 'secondary',
                    cancelVariant: 'danger',
                    okTitle: 'YES',
                    cancelTitle: 'NO',
                    hideHeaderClose: false,
                    centered: true
                };
                this.createModal(this.modal);
            },
            clickedDeleteButton(item) {
               this.$emit('delete-button-clicked', item);
            }
        }
    };
</script>
