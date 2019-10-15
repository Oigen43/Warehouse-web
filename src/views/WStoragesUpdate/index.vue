<template>
  <b-row>
    <b-col
      v-if="updatedStorage.id"
      class="w-storages-update-form"
      lg="4"
      offset-lg="4">
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
        @click="redirect"
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
            companyId() {
                return this.$route.params.companyId;
            },
            warehouseId() {
              return this.$route.params.warehouseId;
            },
            storageId() {
                return +this.$route.params.storageId;
            },
            storageType() {
                return this.updatedStorage.StorageType;
            },
            storageCapacity() {
                return this.updatedStorage.storageCapacity;
            }
        },
        methods: {
            ...mapActions({
                fetchStorageTypes: 'fetchStorageTypes',
                getUpdatedStorageData: 'getUpdatedStorage',
                sendUpdatedStorageData: 'sendUpdatedStorage'
            }),
            redirect() {
                router.push(`/companies/${this.companyId}/warehouses/${this.warehouseId}/storages`);
            },
            async sendData(storage) {
                const res = await this.sendUpdatedStorageData(storage);
                !res.error && this.redirect();
            }
        },
        created: async function() {
            await this.getUpdatedStorageData(this.storageId);
            await this.fetchStorageTypes();
        }
    };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
