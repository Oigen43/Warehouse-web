<template>
  <b-row>
    <b-col class="w-storages-update-form" lg="3" sm="12" offset-lg="4">
      <h1 class="w-storages-update-form-h1">Update Storage</h1>
      <w-form
        @form-submitted="sendData"
        submitButtonName="UPDATE STORAGE"
        :id="storageId"
        :storageTypes="storageTypes"
        :selectedStorageType="storageType"
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
    import { mapState, mapActions } from 'vuex';
    import { BRow, BCol, BButton } from 'bootstrap-vue';

    import router from '../../router';
    import WForm from '../../components/WStorageForm';

    export default {
        name: 'WStoragesUpdateForm',
        components: {
            BRow,
            BCol,
            WForm,
            BButton
        },
        computed: {
            ...mapState([
                'updatedStorage',
                'storageTypes'
            ]),
            storageId() {
                return this.updatedStorage.id;
            },
            storageType() {
                return this.updatedStorage.StorageType.id;
            },
            storageCapacity() {
                return this.updatedStorage.storageCapacity;
            }
        },
        methods: {
            ...mapActions({
                sendUpdatedStorageData: 'sendUpdatedStorage'
            }),
            redirect() {
                router.push('/storages');
            },
            async sendData(storage) {
                const res = await this.sendUpdatedStorageData(storage);
                !res.error && this.redirect();
            }
        },
    };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
