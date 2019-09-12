<template>
  <b-table
   head-variant="dark"
   borderless
   hover
   responsive
   :items="usersList"
   :fields="fields"
  >
    <template
      slot="[delete]"
      slot-scope="data">
      <b-button
        variant="outline-dark"
        size="sm"
        @click="clickedDeleteButton(data.item)">
        ✕
      </b-button>
    </template>
    <template
      slot="[update]"
      slot-scope="data">
      <b-button
        variant="warning"
        size="sm"
        @click="clickedUpdateButton(data.item)">
        Update
      </b-button>
    </template>
  </b-table>
</template>

<script>
    import { mapActions } from 'vuex';
    import router from '../../../../router';
    import { BTable, BButton } from 'bootstrap-vue';
    export default {
        name: 'WList',
        components: {
            BTable,
            BButton
        },
        props: ['usersList'],
        data() {
            return {
                fields: [
                    'firstName', 'surname', 'patronymic', 'birthDate', 'email',
                    { key: 'address.city', label: 'City' },
                    { key: 'address.street', label: 'Street' },
                    { key: 'address.house', label: 'House' },
                    { key: 'update', label: '' },
                    { key: 'delete', label: '' }
                ]
            };
        },
        methods: {
            ...mapActions({
                getUpdatedUserData: 'getUpdatedUser',
                sendDeletedUserData: 'deleteUser'
            }),
            clickedUpdateButton(item) {
                this.getUpdatedUserData(item);
                router.push('/users/update');
            },
            clickedDeleteButton(item) {
               this.$emit('delete-button-clicked', item);
            }
        }
    };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
