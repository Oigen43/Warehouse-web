<template>
  <b-row>
    <b-col class="w-storages-add-form" lg="3" sm="12" offset-lg="4">
      <h1 class="w-storages-add-form-h1">Add a New Storage</h1>
      <w-form
        @form-submitted="sendData"
        submitButtonName="ADD STORAGE"
        :storageTypes="storageTypes"
        :selectedStorageType="selectedStorageType"
        :storageCapacity="storageCapacity"
      ></w-form>
      <b-button
        variant="link"
        to="/storages"
        class="w-storages-go-back-link"
      >Go Back
      </b-button>
    </b-col>
  </b-row>
</template>

<script>
    import { BRow, BCol, BButton } from 'bootstrap-vue';
    import { mapActions, mapState } from 'vuex';

    import WForm from '../../components/WStorageForm';
    import router from '../../router';

    export default {
        name: 'WStoragesAddForm',
        components: {
            BRow,
            BCol,
            BButton,
            WForm,
        },
        data: function () {
            return {
                storageCapacity: '',
                selectedStorageType: null
            };
        },
        computed: {
            ...mapState([
                'currentWarehouse',
                'storageTypes'
            ])
        },
        methods: {
            ...mapActions({
                sendNewStorageData: 'createStorage'
            }),
            redirect() {
                router.push('/storages');
            },
            async sendData(newStorage) {
                newStorage.warehouseInfo = this.currentWarehouse;
                const res = await this.sendNewStorageData(newStorage);
                !res.error && this.redirect();
            }
        }
    };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
